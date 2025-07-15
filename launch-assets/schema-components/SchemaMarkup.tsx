'use client';

import Script from 'next/script';

interface SchemaMarkupProps {
  data: Record<string, any>;
  type?: string;
}

export function SchemaMarkup({ data, type = 'application/ld+json' }: SchemaMarkupProps) {
  return (
    <Script
      id={`schema-${data['@type']}-${Date.now()}`}
      type={type}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
      strategy="beforeInteractive"
    />
  );
}