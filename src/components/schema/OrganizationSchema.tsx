import { SchemaMarkup } from './SchemaMarkup';

export function OrganizationSchema() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': 'https://thevibelaunch.ai/#organization',
    name: 'The Vibe Launch',
    alternateName: 'thevibelaunch.ai',
    url: 'https://thevibelaunch.ai',
    logo: 'https://thevibelaunch.ai/images/logo.png',
    description: 'The premier platform for mastering AI-powered coding with Cursor and Claude, offering cutting-edge courses, tools, and resources to help developers code 10x faster.',
    sameAs: [
      'https://twitter.com/thevibelaunch',
      'https://linkedin.com/company/thevibelaunch',
      'https://github.com/thevibelaunch'
    ],
    email: 'support@thevibelaunch.ai',
    foundingDate: '2025-01-01',
    slogan: 'Code 10x Faster with AI',
    knowsAbout: [
      'AI-Assisted Programming',
      'Cursor IDE',
      'Claude AI',
      'Code Generation',
      'Developer Productivity',
      'AI Prompt Engineering',
      'Software Development'
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '47',
      highPrice: '197',
      offerCount: '3',
      offers: [
        {
          '@type': 'Offer',
          name: 'Ultimate Cursor Rulebook',
          price: '47',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://thevibelaunch.ai/products/ultimate-cursor-rulebook'
        },
        {
          '@type': 'Offer', 
          name: 'The Vibe Launch Pro',
          price: '47',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://thevibelaunch.ai/pro',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '47',
            priceCurrency: 'USD',
            billingDuration: 'P1M'
          }
        }
      ]
    }
  };

  return <SchemaMarkup data={organizationData} />;
}