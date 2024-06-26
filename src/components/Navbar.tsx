'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ThemeButton } from './ThemeButton'
import { FaSearch } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import Image from 'next/image'
import { LogInIcon, LogOutIcon, PlusIcon, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from './ui/button'

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)

  const {data: session} = useSession()
  console.log(session)

  const openSearch = () => {
    setSearchOpen(true)
    setTimeout(() => setSearchVisible(true), 10) // Trigger transition
  }

  const closeSearch = () => {
    setSearchVisible(false)
    setTimeout(() => setSearchOpen(false), 300) // Wait for transition to end
  }

  return (
    <nav className="bg-primary lg:pb-28 lg:pt-7 py-8 dark:bg-gray-800 relative">
      <div className="container mx-auto flex justify-between items-center relative">
        <button onClick={() => setSidebarOpen(true)} className="text-black lg:hidden focus:outline-none dark:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div className="flex items-center lg:w-[70%] justify-between w-[25%] font-[600] space-x-4">
          <Link href="/about" className="text-black hidden lg:block dark:text-gray-200 whitespace-nowrap hover:underline">About</Link>
          <Link href="/chefs" className="text-black hidden lg:block dark:text-gray-200 whitespace-nowrap hover:underline">Chef's</Link>
          <Link href="/diets" className="text-black hidden lg:block dark:text-gray-200 whitespace-nowrap hover:underline">Diets</Link>
          <Link href="/health-tips" className="text-black hidden lg:block dark:text-gray-200 whitespace-nowrap hover:underline">Health Tips</Link>
          <Link href="/share-recipe" className="text-white hidden lg:flex dark:text-gray-200 py-2 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary dark:bg-primary disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap">Share Recipe <PlusIcon /></Link>
          {/* <Link href="/signin" className="text-white hidden lg:flex dark:text-gray-200 py-2 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary dark:bg-primary disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap">Login <LogInIcon /></Link>
          <Link href="/signup" className="text-white hidden lg:flex dark:text-gray-200 py-2 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary dark:bg-primary disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap">Signup <User /></Link> */}
          {session ? (
            <div className="flex items-center space-x-4">
              <Avatar className="bg-gray-500 !dark:bg-primary text-primary">
                <AvatarImage src={session.user.image} alt="Avatar" />
                <AvatarFallback>{session.user.name ? (session.user.name[0].toUpperCase()) : (session.user.username[0].toUpperCase())}</AvatarFallback>
              </Avatar>
              <Button className="text-white hidden lg:flex dark:text-gray-200 py-2 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary dark:bg-primary disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap" onClick={() => signOut()}>
                Logout <LogOutIcon/>
              </Button>
            </div>
          ) : (
            <>
              <Link href="/signin" className="text-white hidden lg:flex dark:text-gray-200 py-2 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary dark:bg-primary disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap">
                Sign In <LogInIcon />
              </Link>
              <Link href="/signup" className="text-white hidden lg:flex dark:text-gray-200 py-2 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary dark:bg-primary disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap">
                Sign Up <User />
              </Link>
            </>
          )}
        </div>
        <div className='flex justify-center w-[50%] lg:hidden'>
        <div className="text-black text-lg font-semibold dark:text-white sm:-top-[50px] -top-[20px] sm:w-[200px] w-[120px] relative">
          <Link href={"/"} className="bg-primary dark:bg-gray-800 absolute -top-[0px] left-0 sm:w-[200px] w-[120px] sm:h-[200px] h-[120px] p-5 rounded-full">
            <Image
              src="/Images/Logo.png"
              // src="https://i.postimg.cc/SjsgbyF9/Logo.png"
              alt="Logo"
              layout="fill"
              objectFit="contain"
              className="!w-[80%] rounded-full !h-[80%] !top-1/2 !left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </Link>
        </div>
      </div>
        <div className="flex items-center justify-end space-x-2 lg:w-[30%] w-[25%]">
          <div className="relative lg:block hidden">
            <input type="text" placeholder="Search" className="p-2 rounded bg-gray-200 text-black dark:bg-gray-700 dark:text-white" />
            <button className="absolute top-1/2 right-4 -translate-y-1/2 text-black dark:text-white">
              <FaSearch />
            </button>
          </div>
          <ThemeButton />
          <button onClick={openSearch} className="text-black lg:hidden focus:outline-none dark:text-white">
            <FaSearch className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="hidden lg:block">
        <div className='flex justify-center w-full'>
          <div className="text-black text-lg font-semibold dark:text-white sm:w-[200px] w-[120px] relative">
            <Link href={"/"} className="bg-primary dark:bg-gray-800 absolute -top-[0px] left-0 sm:w-[200px] w-[120px] sm:h-[200px] h-[120px] p-5 rounded-full">
              <Image
                src="/Images/Logo.png"
                alt="Logo"
                layout="fill"
                objectFit="contain"
                className="!w-[80%] rounded-full !h-[80%] !top-1/2 !left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </Link>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center search-overlay ${searchVisible ? '' : 'search-overlay-hidden'}`}>
          <div className={`relative w-full px-4 ${searchVisible ? 'slide-down' : 'slide-up'}`}>
            <input
              type="text"
              placeholder="Search"
              className="w-full p-4 rounded bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
            />
            <button onClick={closeSearch} className="absolute top-1/2 right-7 -translate-y-1/2 text-black dark:text-white">
              <AiOutlineClose className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <button onClick={() => setSidebarOpen(false)} className="text-black dark:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-2 p-4">
          <Link href="/about" className="text-black dark:text-gray-200">About</Link>
          <Link href="/chefs" className="text-black dark:text-gray-200">Chef's</Link>
          <Link href="/diets" className="text-black dark:text-gray-200">Diets</Link>
          <Link href="/health-tips" className="text-black dark:text-gray-200">Health Tips</Link>
          <Link href="/share-recipe" className="text-white flex dark:text-gray-200 py-2 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary dark:bg-primary disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap">Share Recipe <PlusIcon /></Link>
          <Link href="/share-recipe" className="text-white flex dark:text-gray-200 py-2 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary dark:bg-primary disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap">Login <LogInIcon /></Link>
          <Link href="/share-recipe" className="text-white flex dark:text-gray-200 py-2 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-secondary dark:bg-primary disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap">Signup <User /></Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
