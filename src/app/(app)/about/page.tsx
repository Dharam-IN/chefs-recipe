import { Container } from '@/components/Container'
import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12 md:pt-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
            About Chef&apos; Recipe
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
            Welcome to Chef&apos; Recipe!
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Chef&apos; Recipe is a platform where chefs and cooking enthusiasts
            can share their favorite recipes. You can explore a wide variety of
            dishes without needing to create an account. To share your own
            recipes&lsquo; simply sign up and start sharing!
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-semibold text-gray-800 dark:text-white mb-6">
            Our Mission
          </h2>
          <div className="flex items-center flex-col md:flex-row gap-4">
            <Image
              src="/Images/ChefVision.png"
              alt="Our Mission"
              width={200}
              height={300}
              className="rounded-lg shadow-lg mr-8"
            />
            <p className="text-lg text-gray-700 dark:text-gray-300">
              At Chef&apos; Recipe&lsquo; our mission is to create a
              community-driven platform for sharing and discovering delicious
              recipes. Whether you&apos;re a professional chef or a home
              cook&lsquo; Chef&apos; Recipe is your go-to resource for culinary
              inspiration.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-semibold text-gray-800 dark:text-white mb-6">
            Features
          </h2>
          <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
            <li>
              <strong>Recipe Sharing:</strong> Share your favorite recipes with
              the community.
            </li>
            <li>
              <strong>Browse Recipes:</strong> Discover a diverse collection of
              recipes from various chefs and users.
            </li>
            <li>
              <strong>User Profiles:</strong> Create a profile to manage and
              showcase your recipes.
            </li>
            <li>
              <strong>Search Functionality:</strong> Easily find recipes by
              name&lsquo; ingredient&lsquo; or category.
            </li>
            <li>
              <strong>Community Interaction:</strong> Comment on recipes and
              engage with other users.
            </li>
          </ul>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-semibold text-gray-800 dark:text-white mb-6">
            Why Choose Chef&apos; Recipe?
          </h2>
          <div className="flex items-center flex-col md:flex-row gap-4">
            <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <li>
                <strong>Community-Driven:</strong> Join a passionate community
                of chefs and food enthusiasts.
              </li>
              <li>
                <strong>Easy to Use:</strong> Intuitive interface for seamless
                recipe browsing and sharing.
              </li>
              <li>
                <strong>Personalization:</strong> Customize your profile and
                bookmark favorite recipes.
              </li>
              <li>
                <strong>Secure and Reliable:</strong> Your data is protected
                with advanced security measures.
              </li>
            </ul>
            <Image
              src="/Images/chefcooking.png"
              alt="Why Choose Us"
              width={250}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Get Started Section */}
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-gray-800 dark:text-white mb-6">
            Get Started
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Ready to share your culinary creations or explore new recipes? Sign
            up today and become part of the Chef&apos; Recipe community!
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Thank you for choosing Chef&apos; Recipe. Get ready to embark on a
            delicious journey!
          </p>
        </div>
      </div>
    </Container>
  )
}

export default page
