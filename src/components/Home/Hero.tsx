'use client'
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section className="bg-gray-200 dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center md:py-28 lg:px-12 pt-20">
        <Link href="#" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
          <span className="text-xs bg-primary-600 rounded-full text-white dark:text-black dark:bg-white bg-primary px-4 py-1.5 mr-3">New</span>
          <span className="text-sm font-medium">Discover More Recipes</span>
          <FiArrowRight className="ml-2 w-5 h-5" />
        </Link>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to Chef's Recipe</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Explore and share your favorite recipes with our community of chefs and cooking enthusiasts.</p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 bg-primary">
            Explore Recipes
            <FiArrowRight className="ml-2 -mr-1 w-5 h-5" />
          </Link>
          <Link href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-primary hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-primary dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            <FiPlay className="mr-2 -ml-1 w-5 h-5" />
            Watch Video
          </Link>
        </div>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <span className="font-semibold text-gray-400 uppercase">Follow Us</span>
          <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
            <Link href="https://github.com/Dharam-IN" target='_blank' className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
              <FaGithub className='md:text-3xl'/>
            </Link>
            <Link href="https://x.com/Dharam__IN" target='_blank' className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
              <FaTwitter className='md:text-3xl'/>
            </Link>
            <Link href="https://linkedin.com/in/dharam-in" target='_blank' className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
              <FaLinkedin className='md:text-3xl'/>
            </Link>
            <Link href="https://www.instagram.com/freakycoders/" target='_blank' className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
              <FaInstagram className='md:text-3xl'/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
