import { SchemaMarkup } from './SchemaMarkup';

interface CourseSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  courseCode?: string;
  duration?: string;
  educationalLevel?: string;
  teaches?: string[];
  modules?: Array<{
    name: string;
    description: string;
    duration?: string;
  }>;
  price?: string;
  image?: string;
}

export function CourseSchema({
  name,
  description,
  url,
  provider = 'The Vibe Launch',
  courseCode,
  duration,
  educationalLevel = 'Beginner',
  teaches = [],
  modules = [],
  price,
  image
}: CourseSchemaProps) {
  const courseData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url,
    courseCode: courseCode || `VIBE-COURSE-${name.replace(/\s+/g, '-').toUpperCase()}`,
    provider: {
      '@type': 'Organization',
      name: provider,
      sameAs: 'https://thevibelaunch.ai'
    },
    educationalLevel,
    teaches: teaches.length > 0 ? teaches : [
      'AI-Assisted Programming',
      'Cursor IDE Usage',
      'Claude AI Integration',
      'Developer Productivity'
    ],
    inLanguage: 'en-US',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: duration || 'PT10H',
      instructor: {
        '@type': 'Person',
        name: 'The Vibe Launch Team',
        url: 'https://thevibelaunch.ai/about'
      }
    }
  };

  if (modules.length > 0) {
    (courseData as any).syllabusSections = modules.map((module, index) => ({
      '@type': 'Syllabus',
      name: module.name,
      description: module.description,
      position: index + 1,
      timeRequired: module.duration || 'PT1H'
    }));
  }

  if (price) {
    (courseData as any).offers = {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url,
      category: 'Professional Development'
    };
  }

  if (image) {
    (courseData as any).image = image;
  }

  return <SchemaMarkup data={courseData} />;
}