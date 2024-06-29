'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub
} from 'react-icons/fa'

export const Footer = () => {
  const footerNavs = [
    {
      href: '/about',
      name: 'About'
    },
    {
      href: 'blogs',
      name: 'Blogs'
    },
    {
      href: '/chefs',
      name: 'Chefs'
    },
    {
      href: '/health-tips',
      name: 'Health Tips'
    },
    {
      href: '/contact',
      name: 'Contact'
    }
  ]

  return (
    <footer className="text-white bg-primary px-4 py-5 mx-auto md:px-8 dark:bg-gray-800 dark:text-gray-200">
      <div className="max-w-lg sm:mx-auto sm:text-center">
        <Image
          src={'/Images/Logo.png'}
          width={100}
          height={100}
          alt="Footer Logo"
          className="mx-auto rounded-full"
        />
        <p className="leading-relaxed mt-2 text-[15px]">
          Chef&apos;s Recipe is your ultimate destination to explore, create,
          and share culinary delights. Discover a rich collection of recipes
          curated by top chefs from around the globe. Whether you&apos;re a....
        </p>
      </div>
      <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
        {footerNavs.map((item, idx) => (
          <li key={idx} className="hover:underline dark:hover:text-white">
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; {new Date().getFullYear()}{' '}
          <Link
            className="underline text-white dark:text-primary"
            href={'https://github.com/Dharam-IN'}
          >
            Dharam-IN
          </Link>{' '}
          All rights reserved.
        </div>
        <div className="mt-6 sm:mt-0">
          <ul className="flex items-center space-x-4">
            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <Link target="_blank" href="https://github.com/Dharam-IN">
                <FaGithub className="w-6 h-6 text-blue-600" />
              </Link>
            </li>
            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <Link target="_blank" href="https://x.com/Dharam__IN">
                <FaTwitter className="w-6 h-6 text-blue-400" />
              </Link>
            </li>
            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <Link
                target="_blank"
                href="https://www.instagram.com/freakycoders/"
              >
                <FaInstagram className="w-6 h-6 text-pink-500" />
              </Link>
            </li>
            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/dharam-in"
              >
                <FaLinkedin className="w-6 h-6 text-blue-700" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
