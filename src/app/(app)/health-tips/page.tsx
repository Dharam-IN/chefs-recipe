'use client'
import React from 'react'

const HealthTips = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 md:pt-20">
      <div className="container mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
            Health Tips
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Welcome to our health tips section. Here, you&apos;ll find valuable
            advice on various health-related topics to help you maintain a
            healthy lifestyle. From eating habits to exercise routines
            we&apos;ve got you covered.
          </p>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              When to Eat
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Eating at regular intervals is crucial for maintaining energy
              levels and metabolism. Aim to eat every 3-4 hours, including three
              main meals and 2-3 healthy snacks. Skipping meals can lead to
              overeating later in the day.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>
                <strong>Breakfast:</strong> Start your day with a nutritious
                meal to kickstart your metabolism.
              </li>
              <li>
                <strong>Lunch:</strong> Keep it balanced with a mix of protein,
                carbs, and healthy fats.
              </li>
              <li>
                <strong>Dinner:</strong> Opt for a lighter meal to aid digestion
                before bedtime.
              </li>
              <li>
                <strong>Snacks:</strong> Choose healthy snacks like fruits,
                nuts, or yogurt to keep your energy levels steady.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              When to Drink Water
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Staying hydrated is essential for overall health. Drink water
              consistently throughout the day. Here are some tips:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>
                Start your day with a glass of water to hydrate after a
                night&apos;s sleep.
              </li>
              <li>Drink water before meals to aid digestion.</li>
              <li>Keep a water bottle with you to sip throughout the day.</li>
              <li>
                Increase water intake in hot weather or during physical
                activity.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              How Much Water to Drink
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              On average, aim to drink about 8 cups (2 liters) of water a day.
              However, individual needs may vary based on activity level,
              climate, and health conditions. Listen to your body and drink when
              you feel thirsty.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>
                Monitor your urine color; clear or light yellow indicates proper
                hydration.
              </li>
              <li>
                Include water-rich foods like fruits and vegetables in your
                diet.
              </li>
              <li>
                Avoid sugary drinks and opt for water or herbal teas instead.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Healthy Eating Habits
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Incorporate a variety of foods into your diet to ensure you get a
              range of nutrients. Focus on whole foods, such as fruits,
              vegetables, whole grains, lean proteins, and healthy fats.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>
                Eat a rainbow of fruits and vegetables to get a mix of vitamins
                and minerals.
              </li>
              <li>
                Choose whole grains over refined grains for more fiber and
                nutrients.
              </li>
              <li>
                Include lean proteins like chicken, fish, beans, and legumes in
                your meals.
              </li>
              <li>Use healthy fats like olive oil, avocados, and nuts.</li>
              <li>Limit processed foods and sugary snacks.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Physical Activity
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Regular physical activity is essential for overall health. Aim for
              at least 30 minutes of moderate exercise most days of the week.
              Exercise can help improve your mood, boost your energy, and
              promote better sleep.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>
                Find an activity you enjoy, such as walking, running, cycling,
                or swimming.
              </li>
              <li>
                Incorporate strength training exercises to build muscle and
                improve bone health.
              </li>
              <li>
                Stay active throughout the day by taking breaks to stretch or
                walk around.
              </li>
              <li>Set realistic fitness goals and track your progress.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Mental Health
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Taking care of your mental health is just as important as physical
              health. Practice self-care and mindfulness to maintain emotional
              well-being.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-400">
              <li>
                Engage in activities that relax and rejuvenate you, such as
                reading, meditation, or hobbies.
              </li>
              <li>
                Stay connected with friends and family to build a support
                network.
              </li>
              <li>
                Manage stress through techniques like deep breathing, yoga, or
                journaling.
              </li>
              <li>
                Seek professional help if you feel overwhelmed or anxious.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthTips
