'use client'
import React from 'react'

const Diets = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 md:pt-20">
      <div className="container mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">Diets</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explore various diets to find the one that fits your lifestyle and health goals. From balanced meal plans to specialized diets, we provide detailed information to help you make informed choices.
          </p>
          
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Mediterranean Diet</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              The Mediterranean diet emphasizes fruits, vegetables, whole grains, nuts, and seeds. It includes moderate consumption of fish and poultry, and limits red meat. Olive oil is the primary source of fat.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>Rich in healthy fats like olive oil and nuts.</li>
              <li>Encourages consumption of fruits and vegetables.</li>
              <li>Focuses on whole grains and legumes.</li>
              <li>Moderate intake of fish and poultry.</li>
              <li>Limits red meat and sweets.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Ketogenic Diet</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              The ketogenic diet is a high-fat, low-carbohydrate diet that aims to induce ketosis, a metabolic state where the body burns fat for fuel instead of carbohydrates.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>High in healthy fats like avocado and coconut oil.</li>
              <li>Moderate protein intake from sources like meat, fish, and eggs.</li>
              <li>Low carbohydrate intake, primarily from non-starchy vegetables.</li>
              <li>Limits sugary foods and grains.</li>
              <li>Can aid in weight loss and improve blood sugar control.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Vegan Diet</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              A vegan diet excludes all animal products, focusing on plant-based foods. It's rich in fruits, vegetables, whole grains, legumes, nuts, and seeds.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>Excludes meat, dairy, eggs, and other animal products.</li>
              <li>Rich in fiber, vitamins, and antioxidants.</li>
              <li>Includes a variety of plant-based proteins.</li>
              <li>Can support heart health and weight management.</li>
              <li>Requires careful planning to ensure adequate nutrient intake.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Paleo Diet</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              The Paleo diet, also known as the caveman diet, focuses on foods that would have been available to our prehistoric ancestors. It includes lean meats, fish, fruits, vegetables, nuts, and seeds.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>Emphasizes whole, unprocessed foods.</li>
              <li>Excludes grains, legumes, and dairy.</li>
              <li>Rich in protein and healthy fats.</li>
              <li>Encourages the consumption of fruits and vegetables.</li>
              <li>Limits sugar and processed foods.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Intermittent Fasting</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Intermittent fasting involves alternating periods of eating and fasting. It's not about what you eat, but when you eat. Common methods include the 16/8 method and the 5:2 diet.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>16/8 method: Fast for 16 hours and eat during an 8-hour window.</li>
              <li>5:2 diet: Eat normally for 5 days and reduce calorie intake for 2 days.</li>
              <li>Can help with weight loss and improve metabolic health.</li>
              <li>Supports cellular repair processes.</li>
              <li>Requires consistency and discipline.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Gluten-Free Diet</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              A gluten-free diet excludes gluten, a protein found in wheat, barley, and rye. It's essential for individuals with celiac disease or gluten sensitivity.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>Avoids all foods containing gluten.</li>
              <li>Includes naturally gluten-free foods like fruits, vegetables, and lean proteins.</li>
              <li>Can improve digestion and reduce inflammation in sensitive individuals.</li>
              <li>Requires careful label reading to avoid hidden sources of gluten.</li>
              <li>May require supplementation to ensure a balanced diet.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Diets
