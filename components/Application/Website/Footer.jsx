import Image from 'next/image'
import React from 'react'
import logo from '@/public/assets/images/rapidex-logo.png'
import Link from 'next/link'
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { FiTwitter } from "react-icons/fi";

import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_REGISTER, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
const Footer = () => {
    return (
        <footer className='bg-gray-50 border-t'>
            <div className='grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 py-10 lg:px-32 px-4'>

                <div className='lg:col-span-1 md:col-span-2 col-span-1'>
                    <Image
                        src={logo}
                        width={383}
                        height={146}
                        alt='logo'
                        className='w-36 mb-2'
                    />
                    <p className='text-gray-500 text-sm'>
                        Rapidex is your reliable partner for industrial hardware and electronic hardware solutions. We provide a wide range of high-quality products including nut bolts, fasteners, bearings, sensors, controllers, PLCs, and cables that support industries, workshops, and innovators across India. Powering progress by making hardware simple, accessible, and dependable.
                    </p>
                </div>


                <div>
                    <h4 className='text-xl font-bold uppercase mb-5'>Categories</h4>
                    <ul>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href="/electronics-hardwares">Electronics Hardwares</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href="/industrial-hardwares">Industrial Hardwares</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href={`${WEBSITE_SHOP}?category=microcontrollers`}>Microcontrollers</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href={`${WEBSITE_SHOP}?category=sensors`}>Sensors & Modules</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href={`${WEBSITE_SHOP}?category=components`}>Electronic Components</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className='text-xl font-bold uppercase mb-5'>Useful Links</h4>
                    <ul>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href={WEBSITE_HOME}>Home</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href={WEBSITE_SHOP}>Shop</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href="/about-us">About Us</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href="/forum">Forum</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href="/bulk-enquiry">Bulk Enquiry</Link>
                        </li>

                    </ul>
                </div>
                <div>
                    <h4 className='text-xl font-bold uppercase mb-5'>Help Center</h4>
                    <ul>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href={WEBSITE_REGISTER}>Register</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href={WEBSITE_LOGIN}>Login</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href={USER_DASHBOARD}>My Account</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li className='mb-2 text-gray-500 hover:text-orange-500 transition-colors'>
                            <Link href="/terms-and-conditions">Terms & Conditions</Link>
                        </li>


                    </ul>
                </div>
                <div>
                    <h4 className='text-xl font-bold uppercase mb-5'>Contact Us </h4>
                    <ul>
                        <li className='mb-2 text-gray-500 flex gap-2'>
                            <IoLocationOutline size={20} />
                            <span className='text-sm'>Rapidex Engg. Services, B.30(A) Kopargaon Industrial Estate Ltd., Po Shingnapur Tal. Kopargaon, Pin : 423603</span>
                        </li>
                        <li className='mb-2 text-gray-500 flex gap-2'>
                            <MdOutlinePhone size={20} />
                            <Link href="tel:+91-7620302114" className='hover:text-orange-500 text-sm transition-colors'>+91 7620302114</Link>
                        </li>
                        <li className='mb-2 text-gray-500 flex gap-2'>
                            <MdOutlineMail size={20} />
                            <Link href="mailto:rapidex95@gmail.com" className='hover:text-orange-500 text-sm transition-colors'>rapidex95@gmail.com</Link>
                        </li>

                    </ul>


                    <div className='flex gap-5 mt-5'>

                        <Link href="https://youtube.com/@rapidexelectronics" target="_blank" rel="noopener noreferrer">
                            <AiOutlineYoutube className='text-orange-500 hover:text-orange-600 transition-colors' size={25} />
                        </Link>
                        <Link href="https://instagram.com/rapidexelectronics" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className='text-orange-500 hover:text-orange-600 transition-colors' size={25} />
                        </Link>
                        <Link href="https://wa.me/917620302114" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp className='text-orange-500 hover:text-orange-600 transition-colors' size={25} />
                        </Link>
                        <Link href="https://facebook.com/rapidexelectronics" target="_blank" rel="noopener noreferrer">
                            <TiSocialFacebookCircular className='text-orange-500 hover:text-orange-600 transition-colors' size={25} />
                        </Link>
                        <Link href="https://twitter.com/rapidexelec" target="_blank" rel="noopener noreferrer">
                            <FiTwitter className='text-orange-500 hover:text-orange-600 transition-colors' size={25} />
                        </Link>

                    </div>

                </div>

            </div>


            <div className='py-5 bg-gray-100' >
                <p className='text-center'>© 2025 Rapidex Engg. Services. All Rights Reserved.</p>
            </div>

        </footer>
    )
}

export default Footer