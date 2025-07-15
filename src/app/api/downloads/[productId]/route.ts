import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { gumroad } from '@/lib/gumroad';
import productCatalog from '../../../../../content/products/catalog.json';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  try {
    
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get license key from query params
    const licenseKey = request.nextUrl.searchParams.get('key');
    if (!licenseKey) {
      return NextResponse.json(
        { error: 'License key required' },
        { status: 400 }
      );
    }

    // Validate license key format
    if (!gumroad.validateLicenseKeyFormat(licenseKey)) {
      return NextResponse.json(
        { error: 'Invalid license key format' },
        { status: 400 }
      );
    }

    // Find the license key in database
    const license = await prisma.licenseKey.findUnique({
      where: { key: licenseKey },
      include: {
        user: true,
        purchase: true,
      },
    });

    if (!license) {
      return NextResponse.json(
        { error: 'License key not found' },
        { status: 404 }
      );
    }

    // Verify license belongs to authenticated user
    if (license.user.email !== session.user.email) {
      return NextResponse.json(
        { error: 'License key does not belong to this account' },
        { status: 403 }
      );
    }

    // Check if license is disabled
    if (license.disabled) {
      return NextResponse.json(
        { error: 'License key has been disabled' },
        { status: 403 }
      );
    }

    // Check if license has expired
    if (license.expiresAt && new Date() > license.expiresAt) {
      return NextResponse.json(
        { error: 'License key has expired' },
        { status: 403 }
      );
    }

    // Check activation limit
    if (license.activations >= license.maxActivations) {
      return NextResponse.json(
        { error: `License key has reached maximum activations (${license.maxActivations})` },
        { status: 403 }
      );
    }

    // Find product in catalog
    const product = productCatalog.products.find(p => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update activation count and last activated timestamp
    await prisma.licenseKey.update({
      where: { id: license.id },
      data: {
        activations: license.activations + 1,
        lastActivatedAt: new Date(),
        metadata: {
          ...(license.metadata as any || {}),
          lastDownloadIp: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          lastDownloadUserAgent: request.headers.get('user-agent'),
          lastDownloadAt: new Date().toISOString(),
        },
      },
    });

    // Generate download URL based on product
    let downloadUrl: string;
    
    if (product.id === 'vibe-marketing-kit') {
      // For the marketing kit, we'll serve it from a public URL or generate a signed URL
      // For now, return a placeholder
      downloadUrl = `/downloads/marketing-kit-v1.zip`;
    } else {
      // For other products, redirect to Gumroad's download URL
      // This would be provided by Gumroad in the purchase webhook
      const gumroadData = license.purchase.metadata as any;
      downloadUrl = gumroadData?.gumroadData?.download_url || '#';
    }

    // Log the download
    console.log('Product download:', {
      productId,
      userId: license.userId,
      licenseKey: license.key,
      activations: license.activations + 1,
    });

    // Return download information
    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        version: product.metadata?.currentVersion || '1.0.0',
      },
      download: {
        url: downloadUrl,
        expiresIn: 3600, // 1 hour
        activations: license.activations + 1,
        maxActivations: license.maxActivations,
      },
      license: {
        key: license.key,
        expiresAt: license.expiresAt,
      },
    });

  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json(
      { error: 'Failed to process download request' },
      { status: 500 }
    );
  }
}

// License key validation endpoint
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const body = await request.json();
    const { licenseKey } = body;

    if (!licenseKey) {
      return NextResponse.json(
        { error: 'License key required' },
        { status: 400 }
      );
    }

    // Validate format
    if (!gumroad.validateLicenseKeyFormat(licenseKey)) {
      return NextResponse.json({
        valid: false,
        error: 'Invalid license key format',
      });
    }

    // Find license in database
    const license = await prisma.licenseKey.findUnique({
      where: { key: licenseKey },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!license) {
      return NextResponse.json({
        valid: false,
        error: 'License key not found',
      });
    }

    // Validate against product
    if (license.productId !== productId) {
      return NextResponse.json({
        valid: false,
        error: 'License key is for a different product',
      });
    }

    // Check status
    const isValid = !license.disabled && 
                   (!license.expiresAt || new Date() < license.expiresAt) &&
                   license.activations < license.maxActivations;

    return NextResponse.json({
      valid: isValid,
      license: {
        key: license.key,
        productId: license.productId,
        activations: license.activations,
        maxActivations: license.maxActivations,
        expiresAt: license.expiresAt,
        user: {
          email: license.user.email,
          name: license.user.name,
        },
      },
    });

  } catch (error) {
    console.error('License validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate license' },
      { status: 500 }
    );
  }
}