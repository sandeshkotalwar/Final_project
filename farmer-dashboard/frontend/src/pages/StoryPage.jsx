import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSeedling, FaTint, FaCalendarAlt, FaChartLine, FaRobot, FaLeaf } from 'react-icons/fa'; // Agriculture-themed icons

const StoryPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-8xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent p-4">
            The Story of Agrivo
          </h1>
          <p className="text-2xl text-gray-700 max-w-2xl mx-auto">
            A Revolution in Farming
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all text-lg shadow-lg hover:shadow-xl"
          >
            Back to Home
          </Link>
        </motion.div>
      </section>

      {/* Inspiration Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent p-2">
              Inspiration: A Farmer’s Struggle
            </h2>
            <p className="text-xl text-gray-700">
              It all started with a simple yet powerful realization farmers, the backbone of our society, are often left to battle uncertainty alone. We saw them struggle with unpredictable weather, financial mismanagement, crop health issues, and the challenge of maximizing productivity. Despite their hard work, many lacked access to a proper system that could help them track their progress, manage their farms efficiently, and get reliable advice at the right time.
            </p>
            <p className="text-xl text-gray-700">
              We knew there had to be a better way. A way to empower farmers with knowledge, tracking, and support—without adding unnecessary complexity. That’s how <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Agrivo</strong> was born: a <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">smart technology-based farming assistant</strong> designed to provide farmers with <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">clarity, guidance, and control</strong> over their work.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="h-96 rounded-lg shadow-2xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1623211268529-69c56e303312?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZGlhbiUyMGZhcm1lcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Inspiration"
              className="w-full h-full object-cover shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="h-96 rounded-lg shadow-2xl overflow-hidden order-2 md:order-1"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1682092607850-4ee61bcf73c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluZGlhbiUyMGZhcm1lcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Problem"
              className="w-full h-full object-cover shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8 order-1 md:order-2"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              The Problem: Uncertainty and Lack of Structured Management
            </h2>
            <p className="text-xl text-gray-700">
              Farming is not just about planting seeds and hoping for the best it’s about strategic decision-making. Yet, farmers often find themselves navigating challenges blindly:
            </p>
            <ul className="text-xl text-gray-700 space-y-4">
              <li className="flex items-center gap-3">
                <FaCalendarAlt className="text-green-700 text-2xl" /> {/* Icon */}
                No structured way to track production, revenue, or expenses.
              </li>
              <li className="flex items-center gap-3">
                <FaChartLine className="text-green-700 text-2xl" /> {/* Icon */}
                Weather unpredictability affecting planning.
              </li>
              <li className="flex items-center gap-3">
                <FaLeaf className="text-green-700 text-2xl" /> {/* Icon */}
                Difficulty in managing tasks efficiently.
              </li>
              <li className="flex items-center gap-3">
                <FaRobot className="text-green-700 text-2xl" /> {/* Icon */}
                Lack of instant, expert solutions to farming problems.
              </li>
              <li className="flex items-center gap-3">
                <FaSeedling className="text-green-700 text-2xl" /> {/* Icon */}
                Crop diseases going undiagnosed, leading to massive losses.
              </li>
            </ul>
            <p className="text-xl text-gray-700">
              Traditional methods weren’t enough. Farmers needed a <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">smart yet simple</strong> solution—one that didn’t require complex IoT setups but still provided <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">comprehensive tracking and expert guidance</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent p-2">
              The Solution: A Smart Farming Assistant
            </h2>
            <p className="text-xl text-gray-700">
              Agrivo is <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">not just a tool—it’s a farmer’s companion</strong>. Designed to <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">increase productivity and eliminate guesswork</strong>, it provides a <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">powerful dashboard</strong> that allows farmers to:
            </p>
            <ul className="text-xl text-gray-700 space-y-4">
              <li className="flex items-center gap-3">
                <FaChartLine className="text-green-700 text-2xl" /> {/* Icon */}
                Track production and revenue with detailed insights.
              </li>
              <li className="flex items-center gap-3">
                <FaTint className="text-green-700 text-2xl" /> {/* Icon */}
                Monitor weather for better planning.
              </li>
              <li className="flex items-center gap-3">
                <FaCalendarAlt className="text-green-700 text-2xl" /> {/* Icon */}
                Manage tasks and expenses effortlessly.
              </li>
              <li className="flex items-center gap-3">
                <FaLeaf className="text-green-700 text-2xl" /> {/* Icon */}
                Store and access crop information in one place.
              </li>
              <li className="flex items-center gap-3">
                <FaRobot className="text-green-700 text-2xl" /> {/* Icon */}
                Get instant help from an AI chatbot for farming queries.
              </li>
              <li className="flex items-center gap-3">
                <FaSeedling className="text-green-700 text-2xl" /> {/* Icon */}
                Detect plant diseases quickly with actionable insights.
              </li>
            </ul>
            <p className="text-xl text-gray-700">
              Unlike IoT-based solutions that require costly installations, <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Agrivo is accessible to all farmers</strong>—they just need to enter their data, and the system takes care of the rest.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="h-96 rounded-lg shadow-2xl overflow-hidden"
          >
            <img
              src="https://media.istockphoto.com/id/1284378353/photo/young-indian-farmer-using-smartphone-in-cotton-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=RUcxhIhvv2U1jMzSPSftvM9Bu5VW6txhiCph_9P4PR0="
              alt="Solution"
              className="w-full h-full object-cover shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent p-2">
              A Helping Hand for Every Farmer
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We built <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Agrivo</strong> with one goal in mind: <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">to empower farmers with knowledge and efficiency.</strong> It’s more than just an app it’s a <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">trusted guide</strong> that provides real-time assistance, problem solving, and smart farm management.
            </p>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              With <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Agrivo</strong>, no farmer has to feel lost. No problem goes unanswered. No crop is left unprotected. <strong className="font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">This is the future of farming.</strong>
            </p>
            <Link
              to="/dashboard"
              className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all text-lg shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StoryPage;