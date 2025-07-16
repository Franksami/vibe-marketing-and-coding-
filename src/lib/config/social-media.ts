/**
 * Social Media API Configuration
 * Stores configuration for various social media platforms
 */

export interface SocialMediaConfig {
  platform: string;
  enabled: boolean;
  apiEndpoint?: string;
  authType: 'oauth1' | 'oauth2' | 'apiKey' | 'jwt';
  scopes?: string[];
  rateLimit?: {
    requests: number;
    window: number; // in seconds
  };
  features: string[];
}

export const socialMediaConfigs: Record<string, SocialMediaConfig> = {
  twitter: {
    platform: 'Twitter/X',
    enabled: true,
    apiEndpoint: 'https://api.twitter.com/2',
    authType: 'oauth2',
    scopes: ['tweet.read', 'tweet.write', 'users.read'],
    rateLimit: {
      requests: 300,
      window: 900, // 15 minutes
    },
    features: ['post', 'thread', 'media', 'schedule', 'analytics'],
  },
  
  linkedin: {
    platform: 'LinkedIn',
    enabled: true,
    apiEndpoint: 'https://api.linkedin.com/v2',
    authType: 'oauth2',
    scopes: ['w_member_social', 'r_liteprofile', 'r_emailaddress'],
    rateLimit: {
      requests: 100,
      window: 86400, // 24 hours
    },
    features: ['post', 'article', 'media', 'company-page'],
  },
  
  facebook: {
    platform: 'Facebook',
    enabled: true,
    apiEndpoint: 'https://graph.facebook.com/v18.0',
    authType: 'oauth2',
    scopes: ['pages_manage_posts', 'pages_read_engagement', 'pages_show_list'],
    rateLimit: {
      requests: 200,
      window: 3600, // 1 hour
    },
    features: ['post', 'media', 'schedule', 'pages', 'analytics'],
  },
  
  instagram: {
    platform: 'Instagram',
    enabled: true,
    apiEndpoint: 'https://graph.facebook.com/v18.0',
    authType: 'oauth2',
    scopes: ['instagram_basic', 'instagram_content_publish', 'pages_show_list'],
    rateLimit: {
      requests: 200,
      window: 3600, // 1 hour
    },
    features: ['post', 'story', 'reel', 'carousel', 'schedule'],
  },
  
  youtube: {
    platform: 'YouTube',
    enabled: true,
    apiEndpoint: 'https://www.googleapis.com/youtube/v3',
    authType: 'oauth2',
    scopes: ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube'],
    rateLimit: {
      requests: 10000,
      window: 86400, // 24 hours (quota based)
    },
    features: ['upload', 'playlist', 'community-post', 'analytics'],
  },
  
  tiktok: {
    platform: 'TikTok',
    enabled: false, // Requires approval
    apiEndpoint: 'https://open-api.tiktok.com',
    authType: 'oauth2',
    scopes: ['video.publish', 'user.info.basic'],
    rateLimit: {
      requests: 100,
      window: 86400, // 24 hours
    },
    features: ['post', 'schedule'],
  },
};

/**
 * Get API credentials for a platform
 */
export function getSocialMediaCredentials(platform: string) {
  const envPrefix = platform.toUpperCase();
  
  return {
    clientId: process.env[`${envPrefix}_CLIENT_ID`] || '',
    clientSecret: process.env[`${envPrefix}_CLIENT_SECRET`] || '',
    apiKey: process.env[`${envPrefix}_API_KEY`] || '',
    apiSecret: process.env[`${envPrefix}_API_SECRET`] || '',
    accessToken: process.env[`${envPrefix}_ACCESS_TOKEN`] || '',
    accessTokenSecret: process.env[`${envPrefix}_ACCESS_TOKEN_SECRET`] || '',
  };
}

/**
 * Social media post templates
 */
export const postTemplates = {
  blog: {
    twitter: '📝 New blog post: {{title}}\n\n{{excerpt}}\n\n{{hashtags}}\n\n👉 {{url}}',
    linkedin: '📝 New Blog Post Alert!\n\n{{title}}\n\n{{description}}\n\n{{excerpt}}\n\n{{hashtags}}\n\nRead more: {{url}}',
    facebook: '📝 Check out our latest blog post!\n\n{{title}}\n\n{{description}}\n\nRead the full article: {{url}}',
  },
  course: {
    twitter: '🎓 New course available: {{title}}\n\n{{description}}\n\n{{hashtags}}\n\nEnroll now: {{url}}',
    linkedin: '🎓 Exciting News! New Course Launch\n\n{{title}}\n\n{{description}}\n\nWhat you\'ll learn:\n{{bulletPoints}}\n\n{{hashtags}}\n\nEnroll today: {{url}}',
    facebook: '🎓 New Course Alert!\n\n{{title}}\n\n{{description}}\n\nStart learning today: {{url}}',
  },
  product: {
    twitter: '🚀 Just launched: {{title}}\n\n{{description}}\n\n{{hashtags}}\n\nGet it now: {{url}}',
    linkedin: '🚀 Product Launch Announcement\n\n{{title}}\n\n{{description}}\n\nKey features:\n{{features}}\n\n{{hashtags}}\n\nLearn more: {{url}}',
    facebook: '🚀 New Product Launch!\n\n{{title}}\n\n{{description}}\n\nGet yours today: {{url}}',
  },
};

/**
 * Platform-specific formatting rules
 */
export const platformRules = {
  twitter: {
    maxLength: 280,
    maxImages: 4,
    maxVideos: 1,
    hashtagLimit: 3,
    linkShortening: true,
  },
  linkedin: {
    maxLength: 3000,
    maxImages: 20,
    maxVideos: 1,
    hashtagLimit: 5,
    linkShortening: false,
  },
  facebook: {
    maxLength: 63206,
    maxImages: 30,
    maxVideos: 1,
    hashtagLimit: 10,
    linkShortening: false,
  },
  instagram: {
    maxLength: 2200,
    maxImages: 10, // carousel
    maxVideos: 1,
    hashtagLimit: 30,
    linkShortening: false,
    requiresImage: true,
  },
};

/**
 * Get enabled social platforms
 */
export function getEnabledPlatforms(): string[] {
  return Object.entries(socialMediaConfigs)
    .filter(([_, config]) => config.enabled)
    .map(([platform, _]) => platform);
}

/**
 * Check if platform supports feature
 */
export function platformSupportsFeature(platform: string, feature: string): boolean {
  const config = socialMediaConfigs[platform];
  return config?.features.includes(feature) || false;
}