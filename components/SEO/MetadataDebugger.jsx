'use client'

import { useEffect, useState } from 'react'

const MetadataDebugger = () => {
  const [metadata, setMetadata] = useState({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    const extractMetadata = () => {
      const meta = {}
      
      // Get title
      meta.title = document.title
      
      // Get meta tags
      const metaTags = document.querySelectorAll('meta')
      metaTags.forEach(tag => {
        const name = tag.getAttribute('name') || tag.getAttribute('property')
        const content = tag.getAttribute('content')
        if (name && content) {
          meta[name] = content
        }
      })
      
      // Get canonical
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) {
        meta.canonical = canonical.href
      }
      
      setMetadata(meta)
    }

    extractMetadata()
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isVisible ? 'Hide' : 'Show'} SEO Debug
      </button>
      
      {isVisible && (
        <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-w-md max-h-96 overflow-auto p-4">
          <h3 className="font-bold text-lg mb-3">SEO Metadata Debug</h3>
          
          <div className="space-y-2 text-sm">
            <div>
              <strong>Title:</strong>
              <div className="bg-gray-100 p-2 rounded text-xs break-words">
                {metadata.title}
              </div>
            </div>
            
            <div>
              <strong>Description:</strong>
              <div className="bg-gray-100 p-2 rounded text-xs break-words">
                {metadata.description}
              </div>
            </div>
            
            <div>
              <strong>OG Title:</strong>
              <div className="bg-gray-100 p-2 rounded text-xs break-words">
                {metadata['og:title']}
              </div>
            </div>
            
            <div>
              <strong>OG Description:</strong>
              <div className="bg-gray-100 p-2 rounded text-xs break-words">
                {metadata['og:description']}
              </div>
            </div>
            
            <div>
              <strong>OG Image:</strong>
              <div className="bg-gray-100 p-2 rounded text-xs break-words">
                {metadata['og:image']}
              </div>
            </div>
            
            <div>
              <strong>OG URL:</strong>
              <div className="bg-gray-100 p-2 rounded text-xs break-words">
                {metadata['og:url']}
              </div>
            </div>
            
            <div>
              <strong>Twitter Card:</strong>
              <div className="bg-gray-100 p-2 rounded text-xs break-words">
                {metadata['twitter:card']}
              </div>
            </div>
            
            <div>
              <strong>Twitter Image:</strong>
              <div className="bg-gray-100 p-2 rounded text-xs break-words">
                {metadata['twitter:image']}
              </div>
            </div>
            
            <div>
              <strong>Canonical:</strong>
              <div className="bg-gray-100 p-2 rounded text-xs break-words">
                {metadata.canonical}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t">
            <p className="text-xs text-gray-600">
              Test your URLs with:
            </p>
            <div className="mt-2 space-y-1">
              <a 
                href="https://developers.facebook.com/tools/debug/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline text-xs"
              >
                Facebook Debugger
              </a>
              <a 
                href="https://cards-dev.twitter.com/validator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline text-xs"
              >
                Twitter Card Validator
              </a>
              <a 
                href="https://www.linkedin.com/post-inspector/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline text-xs"
              >
                LinkedIn Post Inspector
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MetadataDebugger
