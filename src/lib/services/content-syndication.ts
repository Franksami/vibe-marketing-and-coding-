import { prisma } from '@/lib/prisma';

export interface ContentItem {
  id: string;
  type: 'blog' | 'course' | 'product' | 'announcement';
  title: string;
  description: string;
  content?: string;
  excerpt?: string;
  imageUrl?: string;
  tags?: string[];
  author?: string;
  publishedAt?: Date;
  url?: string;
  metadata?: Record<string, any>;
}

export interface SyndicationTarget {
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'youtube' | 'email';
  enabled: boolean;
  config?: Record<string, any>;
}

export interface SyndicationResult {
  platform: string;
  success: boolean;
  postId?: string;
  url?: string;
  error?: string;
}

export class ContentSyndicationService {
  private n8nTriggerUrl: string;

  constructor() {
    this.n8nTriggerUrl = process.env.NEXT_PUBLIC_API_URL + '/api/n8n/trigger';
  }

  /**
   * Syndicate content across all enabled platforms
   */
  async syndicateContent(content: ContentItem, targets?: SyndicationTarget[]): Promise<SyndicationResult[]> {
    try {
      // Get default targets if not provided
      const syndicationTargets = targets || await this.getDefaultTargets();
      
      // Filter enabled targets
      const enabledTargets = syndicationTargets.filter(t => t.enabled);

      // Prepare content for each platform
      const syndicationTasks = enabledTargets.map(target => ({
        platform: target.platform,
        content: this.formatContentForPlatform(content, target.platform),
        config: target.config,
      }));

      // Trigger n8n workflow
      const response = await fetch(this.n8nTriggerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'sync-social',
          data: {
            content,
            tasks: syndicationTasks,
          },
          priority: 'normal',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to trigger syndication workflow');
      }

      const result = await response.json();

      // Log syndication attempt
      await prisma.contentSyndication.create({
        data: {
          contentId: content.id,
          contentType: content.type,
          platforms: enabledTargets.map(t => t.platform),
          status: 'processing',
          executionId: result.executionId,
        },
      });

      return [{
        platform: 'all',
        success: true,
        postId: result.executionId,
        url: `/admin/syndication/${result.executionId}`,
      }];
    } catch (error) {
      console.error('Content syndication failed:', error);
      return [{
        platform: 'all',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }];
    }
  }

  /**
   * Format content for specific platform requirements
   */
  private formatContentForPlatform(content: ContentItem, platform: string): any {
    const baseFormat = {
      title: content.title,
      description: content.description,
      url: content.url,
      tags: content.tags || [],
    };

    switch (platform) {
      case 'twitter':
        return {
          ...baseFormat,
          text: this.formatTwitterPost(content),
          mediaUrl: content.imageUrl,
        };

      case 'linkedin':
        return {
          ...baseFormat,
          text: this.formatLinkedInPost(content),
          articleUrl: content.url,
          imageUrl: content.imageUrl,
        };

      case 'facebook':
        return {
          ...baseFormat,
          message: this.formatFacebookPost(content),
          link: content.url,
          picture: content.imageUrl,
        };

      case 'instagram':
        return {
          ...baseFormat,
          caption: this.formatInstagramCaption(content),
          imageUrl: content.imageUrl || this.generateDefaultImage(content),
        };

      case 'email':
        return {
          ...baseFormat,
          subject: `New ${content.type}: ${content.title}`,
          preheader: content.description,
          content: content.content || content.description,
        };

      default:
        return baseFormat;
    }
  }

  /**
   * Format content for Twitter/X
   */
  private formatTwitterPost(content: ContentItem): string {
    const maxLength = 280;
    const url = content.url || '';
    const hashtags = (content.tags || []).map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ');
    
    let text = content.description || content.title;
    const suffix = `\n\n${hashtags}\n${url}`;
    
    if (text.length + suffix.length > maxLength) {
      text = text.substring(0, maxLength - suffix.length - 3) + '...';
    }
    
    return text + suffix;
  }

  /**
   * Format content for LinkedIn
   */
  private formatLinkedInPost(content: ContentItem): string {
    const intro = this.getContentIntro(content.type);
    const hashtags = (content.tags || []).map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ');
    
    return `${intro}\n\n${content.title}\n\n${content.description}\n\n${content.excerpt || ''}\n\n${hashtags}\n\nRead more: ${content.url}`;
  }

  /**
   * Format content for Facebook
   */
  private formatFacebookPost(content: ContentItem): string {
    const intro = this.getContentIntro(content.type);
    return `${intro}\n\n${content.title}\n\n${content.description}\n\nLearn more: ${content.url}`;
  }

  /**
   * Format content for Instagram
   */
  private formatInstagramCaption(content: ContentItem): string {
    const hashtags = (content.tags || []).map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ');
    const maxLength = 2200;
    
    let caption = `${content.title}\n\n${content.description}`;
    
    if (content.excerpt) {
      caption += `\n\n${content.excerpt}`;
    }
    
    caption += `\n\n${hashtags}\n\nLink in bio for more!`;
    
    if (caption.length > maxLength) {
      caption = caption.substring(0, maxLength - 3) + '...';
    }
    
    return caption;
  }

  /**
   * Get content type intro
   */
  private getContentIntro(type: string): string {
    const intros: Record<string, string> = {
      blog: '📝 New Blog Post Alert!',
      course: '🎓 New Course Available!',
      product: '🚀 New Product Launch!',
      announcement: '📢 Important Update!',
    };
    return intros[type] || '📌 Check this out!';
  }

  /**
   * Generate default image if none provided
   */
  private generateDefaultImage(content: ContentItem): string {
    // This would integrate with a service like Bannerbear or Canva API
    return `/api/og?title=${encodeURIComponent(content.title)}&type=${content.type}`;
  }

  /**
   * Get default syndication targets
   */
  private async getDefaultTargets(): Promise<SyndicationTarget[]> {
    // In production, these would come from user settings
    return [
      { platform: 'twitter', enabled: true },
      { platform: 'linkedin', enabled: true },
      { platform: 'facebook', enabled: true },
      { platform: 'instagram', enabled: false }, // Requires image
      { platform: 'email', enabled: true },
    ];
  }

  /**
   * Check syndication status
   */
  async checkSyndicationStatus(executionId: string): Promise<any> {
    const response = await fetch(`${this.n8nTriggerUrl}?executionId=${executionId}`);
    
    if (!response.ok) {
      throw new Error('Failed to check syndication status');
    }
    
    return response.json();
  }

  /**
   * Get syndication history for content
   */
  async getSyndicationHistory(contentId: string): Promise<any[]> {
    return prisma.contentSyndication.findMany({
      where: { contentId },
      orderBy: { createdAt: 'desc' },
    });
  }
}