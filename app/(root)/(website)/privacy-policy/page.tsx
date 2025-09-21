import React from 'react'

const PrivacyPolicy = () => {
    return (
        <div>
            <div className='lg:px-40 px-5 py-20'>
                <div className='max-w-4xl mx-auto'>
                    <h1 className='text-4xl font-bold mb-8 text-gray-800'>Privacy Policy</h1>
                    
                    <div className='prose prose-lg max-w-none'>
                        <p className='text-lg leading-relaxed mb-6'>
                            At <strong>Rapidex</strong>, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
                        </p>

                        <p className='text-gray-700 leading-relaxed mb-8'>
                            This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or make a purchase from our industrial and electronic hardware catalog.
                        </p>

                        <div className='bg-orange-50 p-6 rounded-lg mb-8'>
                            <h3 className='text-2xl font-semibold mb-4 text-gray-800'>Information We Collect</h3>
                            <ul className='space-y-3 text-gray-700'>
                                <li className='flex items-start'>
                                    <span className='text-orange-500 mr-3 font-bold'>•</span>
                                    <div>
                                        <strong>Personal Information:</strong> Name, email address, phone number, and shipping/billing addresses provided during account registration or checkout.
                                    </div>
                                </li>
                                <li className='flex items-start'>
                                    <span className='text-orange-500 mr-3 font-bold'>•</span>
                                    <div>
                                        <strong>Payment Details:</strong> Collected securely through encrypted payment gateways for processing orders.
                                    </div>
                                </li>
                                <li className='flex items-start'>
                                    <span className='text-orange-500 mr-3 font-bold'>•</span>
                                    <div>
                                        <strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on the site to improve user experience.
                                    </div>
                                </li>
                                <li className='flex items-start'>
                                    <span className='text-orange-500 mr-3 font-bold'>•</span>
                                    <div>
                                        <strong>Business Information:</strong> Company details and industrial requirements for bulk orders and technical support.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className='bg-gray-50 p-6 rounded-lg mb-8'>
                            <h3 className='text-2xl font-semibold mb-4 text-gray-800'>How We Use Your Information</h3>
                            <ul className='space-y-3 text-gray-700'>
                                <li className='flex items-start'>
                                    <span className='text-orange-500 mr-3 font-bold'>•</span>
                                    <span>Process your orders for industrial and electronic hardware products</span>
                                </li>
                                <li className='flex items-start'>
                                    <span className='text-orange-500 mr-3 font-bold'>•</span>
                                    <span>Provide technical support and customer service</span>
                                </li>
                                <li className='flex items-start'>
                                    <span className='text-orange-500 mr-3 font-bold'>•</span>
                                    <span>Send order updates, product notifications, and technical bulletins</span>
                                </li>
                                <li className='flex items-start'>
                                    <span className='text-orange-500 mr-3 font-bold'>•</span>
                                    <span>Improve our product catalog and website functionality</span>
                                </li>
                                <li className='flex items-start'>
                                    <span className='text-orange-500 mr-3 font-bold'>•</span>
                                    <span>Ensure website security and prevent fraudulent activities</span>
                                </li>
                            </ul>
                        </div>

                        <div className='bg-orange-100 p-6 rounded-lg mb-8'>
                            <h3 className='text-2xl font-semibold mb-4 text-gray-800'>Data Protection & Security</h3>
                            <p className='text-gray-700 mb-4'>
                                We implement industry-standard security measures to protect your personal information. We do not sell, rent, or share your personal information with third parties, except when necessary to fulfill your order or comply with legal obligations.
                            </p>
                            <p className='text-gray-700'>
                                All payment transactions are processed through secure, encrypted gateways to ensure your financial information remains protected.
                            </p>
                        </div>

                        <div className='bg-gray-50 p-6 rounded-lg mb-8'>
                            <h3 className='text-2xl font-semibold mb-4 text-gray-800'>Your Rights</h3>
                            <ul className='space-y-2 text-gray-700'>
                                <li>• Request access to your personal data</li>
                                <li>• Request correction of inaccurate information</li>
                                <li>• Request deletion of your personal data</li>
                                <li>• Opt-out of marketing communications at any time</li>
                            </ul>
                        </div>

                        <div className='text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg'>
                            <h3 className='text-xl font-semibold mb-2'>Questions About Privacy?</h3>
                            <p className='mb-4'>Contact our support team for any privacy-related concerns.</p>
                            <div className='space-y-2'>
                                <p>Email: <a href="mailto:rapidex95@gmail.com" className='underline hover:no-underline'>rapidex95@gmail.com</a></p>
                                <p>Phone: <a href="tel:+91-7620302114" className='underline hover:no-underline'>+91 7620302114</a></p>
                            </div>
                        </div>

                        <div className='mt-8 text-center text-gray-600'>
                            <p>
                                By using our website, you consent to the practices outlined in this Privacy Policy. We may update this policy from time to time, and any changes will be reflected on this page.
                            </p>
                            <p className='mt-4 font-semibold'>
                                Thank you for trusting Rapidex. Your privacy is important to us.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
