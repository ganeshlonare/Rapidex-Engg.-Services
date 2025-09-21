import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
    title: "Test Page - Metadata Check",
    description: "This is a test page to verify that metadata is working correctly on our website.",
    keywords: ["test", "metadata", "seo"],
    url: "/test-metadata"
});

export default function TestMetadataPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Metadata Test Page</h1>
            
            <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">How to Test Metadata:</h2>
                
                <ol className="list-decimal list-inside space-y-2">
                    <li>Right-click on this page and select "View Page Source"</li>
                    <li>Look for these meta tags in the HTML head:</li>
                </ol>
                
                <div className="mt-4 bg-white p-4 rounded border">
                    <h3 className="font-semibold mb-2">Expected Meta Tags:</h3>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
{`<title>Test Page - Metadata Check | Rapidex Engineering Services - Premium Industrial Components</title>
<meta name="description" content="This is a test page to verify that metadata is working correctly on our website." />
<meta property="og:title" content="Test Page - Metadata Check | Rapidex Engineering Services - Premium Industrial Components" />
<meta property="og:description" content="This is a test page to verify that metadata is working correctly on our website." />
<meta property="og:image" content="[YOUR_SITE_URL]/assets/images/rapidex-social-share.png" />
<meta property="og:url" content="[YOUR_SITE_URL]/test-metadata" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Test Page - Metadata Check | Rapidex Engineering Services - Premium Industrial Components" />
<meta name="twitter:description" content="This is a test page to verify that metadata is working correctly on our website." />
<meta name="twitter:image" content="[YOUR_SITE_URL]/assets/images/rapidex-social-share.png" />`}
                    </pre>
                </div>
                
                <div className="mt-4 p-4 bg-yellow-100 rounded border border-yellow-400">
                    <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important:</h3>
                    <p className="text-yellow-700">
                        If [YOUR_SITE_URL] shows as "http://localhost:3000", your metadata won't work on social media platforms. 
                        You need to set NEXT_PUBLIC_SITE_URL to your actual domain in your .env file.
                    </p>
                </div>
                
                <div className="mt-4 p-4 bg-blue-100 rounded border border-blue-400">
                    <h3 className="font-semibold text-blue-800 mb-2">🔧 Quick Fix:</h3>
                    <p className="text-blue-700 mb-2">
                        Add this to your .env file:
                    </p>
                    <code className="bg-white px-2 py-1 rounded text-sm">
                        NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
                    </code>
                </div>
            </div>
        </div>
    )
}
