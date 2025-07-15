import { SchemaMarkup } from './SchemaMarkup';

interface PersonSchemaProps {
  name: string;
  description?: string;
  jobTitle?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  alumniOf?: string;
  worksFor?: {
    name: string;
    url: string;
  };
}

export function PersonSchema({
  name,
  description,
  jobTitle = 'AI Developer Educator',
  url,
  image,
  sameAs = [],
  knowsAbout = [],
  alumniOf,
  worksFor
}: PersonSchemaProps) {
  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    description: description || `${name} is an expert in AI-assisted programming and developer education.`,
    jobTitle,
    url: url || 'https://thevibelaunch.ai/about',
    image: image || 'https://thevibelaunch.ai/images/team/default.png',
    sameAs: sameAs.length > 0 ? sameAs : [
      'https://twitter.com/thevibelaunch',
      'https://linkedin.com/in/thevibelaunch'
    ],
    knowsAbout: knowsAbout.length > 0 ? knowsAbout : [
      'AI Programming',
      'Cursor IDE',
      'Claude AI',
      'Software Development',
      'Developer Education',
      'Productivity Tools'
    ],
    worksFor: worksFor || {
      '@type': 'Organization',
      name: 'The Vibe Launch',
      url: 'https://thevibelaunch.ai'
    }
  };

  if (alumniOf) {
    (personData as any).alumniOf = {
      '@type': 'CollegeOrUniversity',
      name: alumniOf
    };
  }

  return <SchemaMarkup data={personData} />;
}