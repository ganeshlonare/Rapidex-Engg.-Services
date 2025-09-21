import React from 'react'

const TermsAndConditions = () => {
    return (
        <div>
            <div className='lg:px-40 px-5 py-20'>
                <h1 className='text-xl font-semibold mb-3'>Terms & Conditions</h1>

                <div className='max-w-4xl mx-auto'>
                    <p className='text-lg leading-relaxed mb-6'>
                        Welcome to Rapidex. By accessing or using our website, you agree to be bound by the following terms and conditions. Please read them carefully.
                    </p>

                    <div className='bg-orange-50 p-6 rounded-lg mb-8'>
                        <ul className='space-y-4 text-gray-700'>
                            <li className='flex items-start'>
                                <span className='text-orange-500 mr-3 font-bold'>•</span>
                                <span>All products listed on Rapidex are subject to availability.</span>
                            </li>
                            <li className='flex items-start'>
                                <span className='text-orange-500 mr-3 font-bold'>•</span>
                                <span>Prices may vary depending on market fluctuations without prior notice.</span>
                            </li>
                            <li className='flex items-start'>
                                <span className='text-orange-500 mr-3 font-bold'>•</span>
                                <span>Product images are for reference purposes only; actual items may differ slightly.</span>
                            </li>
                            <li className='flex items-start'>
                                <span className='text-orange-500 mr-3 font-bold'>•</span>
                                <span>Customers are responsible for selecting the correct product before purchase.</span>
                            </li>
                            <li className='flex items-start'>
                                <span className='text-orange-500 mr-3 font-bold'>•</span>
                                <span>Returns and replacements are accepted only as per our return policy.</span>
                            </li>
                            <li className='flex items-start'>
                                <span className='text-orange-500 mr-3 font-bold'>•</span>
                                <span>Rapidex is not liable for any indirect damages or losses arising from product usage.</span>
                            </li>
                            <li className='flex items-start'>
                                <span className='text-orange-500 mr-3 font-bold'>•</span>
                                <span>By purchasing from Rapidex, you agree to comply with our policies and guidelines.</span>
                            </li>
                        </ul>
                    </div>

                    <div className='mt-8 p-6 bg-gray-50 rounded-lg'>
                        <p className='text-gray-700'>
                            If you have any questions regarding these terms, please contact our customer support team at <a href="mailto:rapidex95@gmail.com" className='text-orange-600 hover:text-orange-700'>rapidex95@gmail.com</a> or call us at <a href="tel:+91-7620302114" className='text-orange-600 hover:text-orange-700'>+91 7620302114</a>.
                        </p>

                        <p className='mt-4 text-gray-700'>
                            Thank you for choosing Rapidex. We are committed to delivering quality industrial and electronic hardware solutions with trust and reliability.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions
