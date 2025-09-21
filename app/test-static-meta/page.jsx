// Simple static metadata test - this should work with social media crawlers
export const metadata = {
  title: 'Static Meta Test - Rapidex Engineering Services',
  description: 'This is a static metadata test page to verify social media sharing works correctly.',
  openGraph: {
    title: 'Static Meta Test - Rapidex Engineering Services',
    description: 'This is a static metadata test page to verify social media sharing works correctly.',
    url: 'https://www.rapidex.tech/test-static-meta',
    siteName: 'Rapidex Engineering Services',
    images: [
      {
        url: 'https://www.rapidex.tech/assets/images/rapidex-social-share.png',
        width: 1200,
        height: 630,
        alt: 'Rapidex Engineering Services - Static Meta Test',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Static Meta Test - Rapidex Engineering Services',
    description: 'This is a static metadata test page to verify social media sharing works correctly.',
    images: ['https://www.rapidex.tech/assets/images/rapidex-social-share.png'],
    creator: '@rapidextech',
  },
}

export default function TestStaticMetaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Static Metadata Test</h1>
      
      <div className="bg-green-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 Test This URL:</h2>
        <code className="bg-white px-2 py-1 rounded text-sm block mb-4">
          https://www.rapidex.tech/test-static-meta
        </code>
        
        <h3 className="font-semibold mb-2">Steps:</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Copy the URL above</li>
          <li>Paste it in WhatsApp chat</li>
          <li>Check if you see title, description, and image</li>
          <li>Test with Facebook Debugger: <a href="https://developers.facebook.com/tools/debug/" target="_blank" className="text-blue-600 underline">Facebook Debugger</a></li>
        </ol>
      </div>
      
      <div className="bg-blue-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Expected Results:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Title:</strong> "Static Meta Test - Rapidex Engineering Services"</li>
          <li><strong>Description:</strong> "This is a static metadata test page to verify social media sharing works correctly."</li>
          <li><strong>Image:</strong> Rapidex logo should appear</li>
          <li><strong>URL:</strong> https://www.rapidex.tech/test-static-meta</li>
        </ul>
      </div>
      
      <div className="bg-yellow-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔍 Debugging:</h2>
        <p className="mb-2">If this page works but your main page doesn't, the issue is with how metadata is being generated on your main page.</p>
        <p>This page uses simple, static metadata that should be rendered server-side and be visible to social media crawlers.</p>
      </div>
    </div>
  )
}
