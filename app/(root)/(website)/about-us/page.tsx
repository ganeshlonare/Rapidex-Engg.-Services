import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://www.rapidex.tech'),
    title: "About Us - Rapidex Industrial & Electronic Hardware Solutions | Rapidex Engineering Services",
    description: "Learn about Rapidex - your reliable partner for industrial hardware and electronic hardware solutions. Quality nut bolts, fasteners, bearings, sensors, controllers, PLCs and more.",
    keywords: ["about us", "rapidex", "industrial hardware", "electronic hardware", "company info", "nut bolts", "fasteners", "bearings", "sensors", "PLCs"],
    openGraph: {
        title: "About Us - Rapidex Industrial & Electronic Hardware Solutions | Rapidex Engineering Services",
        description: "Learn about Rapidex - your reliable partner for industrial hardware and electronic hardware solutions. Quality nut bolts, fasteners, bearings, sensors, controllers, PLCs and more.",
        url: "/about-us",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us - Rapidex Industrial & Electronic Hardware Solutions | Rapidex Engineering Services",
        description: "Learn about Rapidex - your reliable partner for industrial hardware and electronic hardware solutions. Quality nut bolts, fasteners, bearings, sensors, controllers, PLCs and more.",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    alternates: {
        canonical: "/about-us",
    },
};

const AboutUs = () => {
 return (
   <div>
     <div className='lg:px-40 px-5 py-20'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-gray-800'>About Us – Rapidex</h1>
        
        <div className='prose prose-lg max-w-none'>
          <p className='text-lg leading-relaxed mb-6'>
            Welcome to <strong>Rapidex</strong>, your reliable partner for <strong>industrial hardware and electronic hardware solutions</strong>.
          </p>

          <p className='text-gray-700 leading-relaxed mb-6'>
            At Rapidex, we are committed to providing a <strong>wide range of high-quality products</strong> that support industries, workshops, and innovators across India. From <strong>nut bolts, fasteners, bearings, and fittings</strong> to <strong>sensors, controllers, PLCs, switches, connectors, and cables</strong>, our catalog is designed to meet both mechanical and electronic requirements.
          </p>

          <p className='text-gray-700 leading-relaxed mb-6'>
            Our mission is simple – to deliver <strong>durable, affordable, and trusted hardware</strong> that helps you build, repair, and innovate with confidence. With a focus on <strong>quality assurance, timely delivery, and customer satisfaction</strong>, Rapidex stands as a one-stop destination for all your industrial and electronic hardware needs.
          </p>

          <p className='text-gray-700 leading-relaxed mb-8'>
            At Rapidex, we believe in powering progress by making <strong>hardware simple, accessible, and dependable</strong> for everyone.
          </p>

          <div className='bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500 mb-8'>
            <h3 className='text-2xl font-semibold mb-4 text-gray-800'>What We Offer</h3>
            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <h4 className='font-semibold text-orange-600 mb-2'>Industrial Hardware</h4>
                <ul className='text-sm text-gray-600 space-y-1'>
                  <li>• Nut bolts & fasteners</li>
                  <li>• Bearings & fittings</li>
                  <li>• Industrial tools</li>
                  <li>• Mechanical components</li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold text-orange-600 mb-2'>Electronic Hardware</h4>
                <ul className='text-sm text-gray-600 space-y-1'>
                  <li>• Sensors & controllers</li>
                  <li>• PLCs & switches</li>
                  <li>• Connectors & cables</li>
                  <li>• Electronic components</li>
                </ul>
              </div>
            </div>
          </div>


          <div className='text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg'>
            <h3 className='text-xl font-semibold mb-2'>Ready to Get Started?</h3>
            <p className='mb-4'>Explore our extensive catalog of industrial and electronic hardware solutions.</p>
            <a href="/shop" className='inline-block bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors'>
              Browse Products
            </a>
          </div>
        </div>
      </div>
    </div>
   </div>
 )
}

export default AboutUs
