// Structured Data Component for JSON-LD
import Script from 'next/script';

export default function StructuredData({ data }) {
  if (!data) return null;

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Multiple structured data component
export function MultipleStructuredData({ dataArray }) {
  if (!dataArray || !Array.isArray(dataArray)) return null;

  return (
    <>
      {dataArray.map((data, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
