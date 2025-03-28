import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Navbar from '../components/Navbar'; // Import the Navbar component
import FeaturesSection from '../components/FeaturesSection'; // Import the FeaturesSection component
import { motion } from 'framer-motion'; // Import motion from framer-motion

const Home = () => {
  const paths = [
    // Add more paths for additional beams (wider spread)
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
    "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
    "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
    "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
    "M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787",
    "M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
    "M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771",
    "M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763",
    "M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755",
    "M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
    "M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739",
    "M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
    "M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723",
    "M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715",
    "M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707",
    "M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699",
    "M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691",
    "M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683",
    "M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675",
    "M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667",
    "M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659",
    "M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651",
    "M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643",
    // Add more paths as needed...
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Beams */}
      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{
          background: 'white', // Set background to white
          overflow: 'hidden',
        }}
      >
        <svg
          className="pointer-events-none absolute z-0 h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 696 1000" // Adjusted viewBox to cover more vertical space
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803"
            stroke="url(#paint0_radial_242_278)"
            strokeOpacity="0.3" // Increased opacity for more glow
            strokeWidth="1" // Increased stroke width for more visibility
          ></path>

          {paths.map((path, index) => (
            <motion.path
              key={`path-` + index}
              d={path}
              stroke={`url(#linearGradient-${index})`}
              strokeOpacity="0.5" // Increased opacity for more glow
              strokeWidth="1" // Increased stroke width for more visibility
            ></motion.path>
          ))}
          <defs>
            {paths.map((path, index) => (
              <motion.linearGradient
                id={`linearGradient-${index}`}
                key={`gradient-${index}`}
                initial={{
                  x1: "0%",
                  x2: "0%",
                  y1: "0%",
                  y2: "0%",
                }}
                animate={{
                  x1: ["0%", "100%"],
                  x2: ["0%", "95%"],
                  y1: ["0%", "100%"],
                  y2: ["0%", `${93 + Math.random() * 8}%`],
                }}
                transition={{
                  duration: Math.random() * 15 + 15, // Slower animation for subtle effect
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: Math.random() * 1, // Slightly increased delay for smoother animation
                }}
              >
                <stop stopColor="#18CCFC" stopOpacity="0"></stop>
                <stop stopColor="#4ade80"></stop> {/* Green color */}
                <stop offset="32.5%" stopColor="#22c55e"></stop> {/* Green color */}
                <stop offset="100%" stopColor="#16a34a" stopOpacity="0"></stop> {/* Green color */}
              </motion.linearGradient>
            ))}

            <radialGradient
              id="paint0_radial_242_278"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
            >
              <stop offset="0.0666667" stopColor="#d4d4d4"></stop>
              <stop offset="0.243243" stopColor="#d4d4d4"></stop>
              <stop offset="0.43594" stopColor="white" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-4 mt-20 flex flex-col items-center">
            <p className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20 bg-white/50 backdrop-blur-md">
              <span className="hidden md:inline">Agrivo is here to revolutionize farming.</span>
              <Link to="/story" className="font-semibold text-green-600"> {/* Updated to Link */}
                <span className="absolute inset-0"></span> Read the story <span>→</span>
              </Link>
            </p>
          </div>

          {/* Main Heading and Description */}
          <div className="mx-auto max-w-2xl text-center flex flex-col items-center">
            <img
              src="/agrivo.png"
              alt="Agrivo Logo"
              className="mb-2 h-24"
            />
            <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent p-3">
              Agrivo - Your Smart Farming Assistant
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Empowering farmers with cutting-edge technology to boost productivity, detect plant diseases, and manage farms efficiently.
              Agrivo brings the future of agriculture to your fingertips.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/dashboard"
                className="rounded-md bg-gradient-to-r from-green-600 to-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/story" // Link to the story page
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-700 transition-all duration-200"
              >
                Learn more <span>→</span>
              </Link>
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="mt-16 flow-root sm:mt-20">
            <div className="-m-2 rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-2 ring-1 ring-inset ring-green-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 shadow-2xl">
              <img
                src="../public/home.jpeg"
                width="2432"
                height="1442"
                className="rounded-lg shadow-2xl ring-1 ring-green-900/10"
                alt="Agrivo Farming Assistant"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <FeaturesSection />
        </div>
      </div>
    </div>
  );
};

export default Home;