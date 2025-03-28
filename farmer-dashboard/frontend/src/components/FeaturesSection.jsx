import React, { useRef, useEffect } from "react";

const FeaturesSection = () => {
    const featureCardsRef = useRef([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            featureCardsRef.current.forEach((card) => {
                if (!card) return;

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Update glow position
                const glow = card.querySelector(".glow");
                if (glow) {
                    glow.style.left = `${x}px`;
                    glow.style.top = `${y}px`;
                }
            });
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="relative bg-transparent">
            <section
                id="features"
                className="relative block px-6 py-10 md:py-20 md:px-10 border-t border-b border-green-100 bg-transparent"
            >
                {/* Section Heading */}
                <div className="relative mx-auto max-w-5xl text-center">
                    <span className="text-green-600 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
                        Why Choose Agrivo?
                    </span>
                    <h2 className="block w-full bg-gradient-to-b from-green-700 to-green-900 bg-clip-text font-bold text-transparent text-4xl sm:text-5xl py-3">
                        Empowering Farmers with Technology
                    </h2>
                    <p className="mx-auto my-6 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-black">
                        Agrivo provides cutting-edge tools to help farmers boost productivity, detect plant diseases, and manage farms efficiently. Our intuitive tools make farming smarter and easier.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Feature 1: AI Farming Assistant */}
                    <div
                        ref={(el) => (featureCardsRef.current[0] = el)}
                        className="relative rounded-md border-2 border-green-200 bg-white p-8 text-center shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group hover:border-green-400"
                    >
                        {/* Glowing Light */}
                        <div className="glow absolute w-40 h-40 bg-gradient-to-r from-green-300 to-green-500 rounded-full opacity-30 blur-2xl pointer-events-none" />
                        <div
                            className="button-text mx-auto flex h-16 w-16 items-center justify-center rounded-md border"
                            style={{
                                backgroundImage: "linear-gradient(to right, #16a34a 0%, #22c55e 100%)",
                                borderColor: "#22c55e",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-brain text-white"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M15.5 13a3.5 3.5 0 0 1 -3.5 3.5v-7a3.5 3.5 0 0 1 3.5 3.5z" />
                                <path d="M8.5 13a3.5 3.5 0 0 0 3.5 3.5v-7a3.5 3.5 0 0 0 -3.5 3.5z" />
                                <path d="M11 20v-7l-3 -3" />
                                <path d="M17 17a3 3 0 0 0 3 -3v-2a3 3 0 0 0 -3 -3" />
                                <path d="M7 17a3 3 0 0 1 -3 -3v-2a3 3 0 0 1 3 -3" />
                            </svg>
                        </div>
                        <h3 className="mt-6 text-green-800 font-semibold">AI Farming Assistant</h3>
                        <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-black">
                            Get real-time advice and solutions for your farming challenges with our AI-powered chatbot.
                        </p>
                    </div>

                    {/* Feature 2: Plant Disease Detection */}
                    <div
                        ref={(el) => (featureCardsRef.current[1] = el)}
                        className="relative rounded-md border-2 border-green-200 bg-white p-8 text-center shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group hover:border-green-400"
                    >
                        {/* Glowing Light */}
                        <div className="glow absolute w-40 h-40 bg-gradient-to-r from-green-300 to-green-500 rounded-full opacity-30 blur-2xl pointer-events-none" />
                        <div
                            className="button-text mx-auto flex h-16 w-16 items-center justify-center rounded-md border"
                            style={{
                                backgroundImage: "linear-gradient(to right, #16a34a 0%, #22c55e 100%)",
                                borderColor: "#22c55e",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-leaf text-white"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                                <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" />
                            </svg>
                        </div>
                        <h3 className="mt-6 text-green-800 font-semibold">Plant Disease Detection</h3>
                        <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-black">
                            Detect plant diseases early and take preventive measures to protect your crops.
                        </p>
                    </div>

                    {/* Feature 3: Farm Management Dashboard */}
                    <div
                        ref={(el) => (featureCardsRef.current[2] = el)}
                        className="relative rounded-md border-2 border-green-200 bg-white p-8 text-center shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group hover:border-green-400"
                    >
                        {/* Glowing Light */}
                        <div className="glow absolute w-40 h-40 bg-gradient-to-r from-green-300 to-green-500 rounded-full opacity-30 blur-2xl pointer-events-none" />
                        <div
                            className="button-text mx-auto flex h-16 w-16 items-center justify-center rounded-md border"
                            style={{
                                backgroundImage: "linear-gradient(to right, #16a34a 0%, #22c55e 100%)",
                                borderColor: "#22c55e",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-dashboard text-white"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="13" r="2" />
                                <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                                <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                            </svg>
                        </div>
                        <h3 className="mt-6 text-green-800 font-semibold">Farm Management Dashboard</h3>
                        <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-black">
                            Monitor and manage your farm's productivity, expenses, and resources efficiently.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesSection;