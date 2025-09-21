// This page tests server-side rendered metadata
export const metadata = {
  title: 'SSR Test - Rapidex Engineering Services',
  description: 'This is a server-side rendered metadata test page for social media sharing.',
  openGraph: {
    title: 'SSR Test - Rapidex Engineering Services',
    description: 'This is a server-side rendered metadata test page for social media sharing.',
    url: 'https://www.rapidex.tech/test-ssr-metadata',
    siteName: 'Rapidex Engineering Services',
    images: [
      {
        url: 'https://www.rapidex.tech/assets/images/rapidex-social-share.png',
        width: 1200,
        height: 630,
        alt: 'Rapidex Engineering Services - SSR Test',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SSR Test - Rapidex Engineering Services',
    description: 'This is a server-side rendered metadata test page for social media sharing.',
    images: ['https://www.rapidex.tech/assets/images/rapidex-social-share.png'],
    creator: '@rapidextech',
  },
}

export default function TestSSRMetadataPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Server-Side Rendered Metadata Test</h1>
      
      <div className="bg-blue-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 How to Test This Page:</h2>
        
        <ol className="list-decimal list-inside space-y-2">
          <li>Copy this URL: <code className="bg-white px-2 py-1 rounded">https://www.rapidex.tech/test-ssr-metadata</code></li>
          <li>Paste it in WhatsApp to see if the preview shows up</li>
          <li>Test with Facebook Debugger: <a href="https://developers.facebook.com/tools/debug/" target="_blank" className="text-blue-600 underline">Facebook Debugger</a></li>
          <li>Test with Twitter Card Validator: <a href="https://cards-dev.twitter.com/validator" target="_blank" className="text-blue-600 underline">Twitter Validator</a></li>
        </ol>
      </div>
      
      <div className="bg-yellow-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">⚠️ Expected Results:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Title:</strong> "SSR Test - Rapidex Engineering Services"</li>
          <li><strong>Description:</strong> "This is a server-side rendered metadata test page for social media sharing."</li>
          <li><strong>Image:</strong> Your Rapidex logo should appear</li>
          <li><strong>URL:</strong> https://www.rapidex.tech/test-ssr-metadata</li>
        </ul>
      </div>
      
      <div className="bg-green-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">✅ If This Works:</h2>
        <p>If this page shows proper metadata in WhatsApp and social media debuggers, then the issue with your main page is that the metadata is being rendered client-side instead of server-side.</p>
        
        <h3 className="font-semibold mt-4 mb-2">Solution:</h3>
        <p>We need to ensure your main page metadata is rendered on the server, not the client. This might require adjusting your Next.js configuration or metadata generation approach.</p>
      </div>
    </div>
  )
}
