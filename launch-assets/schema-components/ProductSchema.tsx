import { SchemaMarkup } from './SchemaMarkup';

interface ProductSchemaProps {
  name: string;
  description: string;
  price: string;
  image?: string;
  url: string;
  sku?: string;
  category?: string;
  isDigital?: boolean;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export function ProductSchema({
  name,
  description,
  price,
  image,
  url,
  sku,
  category = 'Software',
  isDigital = true,
  aggregateRating
}: ProductSchemaProps) {
  const productData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || 'https://thevibelaunch.ai/images/default-product.png',
    url,
    sku: sku || `VIBE-${name.replace(/\s+/g, '-').toUpperCase()}`,
    category,
    brand: {
      '@type': 'Brand',
      name: 'The Vibe Launch'
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url,
      seller: {
        '@type': 'Organization',
        name: 'The Vibe Launch',
        url: 'https://thevibelaunch.ai'
      }
    },
    isRelatedTo: [
      {
        '@type': 'Thing',
        name: 'Cursor IDE',
        url: 'https://cursor.com'
      },
      {
        '@type': 'Thing', 
        name: 'Claude AI',
        url: 'https://claude.ai'
      },
      {
        '@type': 'Thing',
        name: 'AI-Assisted Programming'
      }
    ]
  };

  if (isDigital) {
    (productData as any)['@type'] = ['Product', 'SoftwareApplication'];
    (productData as any).applicationCategory = 'DeveloperApplication';
    (productData as any).operatingSystem = 'Any';
    (productData as any).softwareVersion = '1.0';
  }

  if (aggregateRating) {
    (productData as any).aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: '5',
      worstRating: '1'
    };
  }

  return <SchemaMarkup data={productData} />;
}