'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPersonBooth } from 'react-icons/fa'
import { MdEmail, MdPhone } from 'react-icons/md'

type Chef = {
  _id: string
  username: string
  email: string
  restaurant: string
  gender: string
  isVerified: boolean
}

const ChefsPage = () => {
  const [chefs, setChefs] = useState<Chef[]>([])

  useEffect(() => {
    const getChefs = async () => {
      try {
        const response = await axios.get('/api/get-chefs')
        setChefs(response.data.data)
      } catch (error) {
        console.error('Error fetching chefs:', error)
      }
    }
    getChefs()
  }, [])

  const CapitalizeText = (e: string) => {
    console.log(e)
    return e.charAt(0).toUpperCase() + e.slice(1)
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-8 px-4 pt-24">
      <div className="container mx-auto rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
          Our Chefs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chefs.map(chef => (
            <div
              key={chef._id}
              className="p-8 sm:flex sm:space-x-6 shadow-2xl dark:bg-gray-700 dark:text-white"
            >
              <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                <img
                  src={`https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60`}
                  alt={`${chef.username}`}
                  className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {CapitalizeText(chef.username)}
                  </h2>
                  <span className="text-sm dark:text-white">
                    {chef.restaurant}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center space-x-2">
                    <MdEmail className="w-4 h-4" aria-label="Email address" />
                    <span className="dark:text-white">{chef.email}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <FaPersonBooth
                      className="w-4 h-4"
                      aria-label="Phone number"
                    />
                    <span className="dark:text-white">
                      {CapitalizeText(chef.gender)}
                    </span>
                  </span>
                </div>
                <Link
                  href={`/${chef.username}`}
                  className="text-white w-fit dark:text-gray-200 py-2 px-4 text-sm font-semibold rounded-lg bg-secondary dark:bg-primary"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChefsPage
