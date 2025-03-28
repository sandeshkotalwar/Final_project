import React, { useEffect, useState } from "react";
import axios from "axios";
import Weather from "../components/Weather";
import Revenue from "../components/Revenue";
import Land from "../components/Land";
import ProductionChart from "../components/ProductionChart";
import StoragePieChart from "../components/StoragePieChart";
import TodoList from "../components/TodoList";
import AddFarmerDataForm from "../components/AddFarmerDataForm";
import SimpleChatbotModal from '../components/SimpleChatbotModal';
import PlantDiseaseModal from '../components/PlantDiseaseModal';
import ExpenseTracker from "../components/ExpenseTracker";

const Dashboard = () => {
    const [farmerData, setFarmerData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [isDiseaseModalOpen, setIsDiseaseModalOpen] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/farmer");
            setFarmerData(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch data. Please check the backend server.");
            setFarmerData({
                weather: "Error loading data",
                revenue: 0,
                land: "Error loading data",
                production: [],
                storage: [],
                todo: [],
                expenses: [],
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!farmerData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-green-600">
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50">
            {/* Responsive Header Section */}
            <header className="backdrop-blur-md bg-white/80 shadow-lg p-4 sm:p-6 rounded-lg border border-green-300">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6">
                        {/* Title Section */}
                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-green-900 tracking-tight">
                                <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                                    Dashboard
                                </span>
                            </h1>
                            <p className="mt-2 text-sm sm:text-base text-gray-600 font-medium">
                                Your agricultural insights at a glance
                            </p>
                        </div>

                        {/* Add Info Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto inline-flex items-center justify-center 
                                   px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 
                                   hover:from-green-700 hover:to-green-800 text-white 
                                   rounded-xl transition-all duration-200 shadow-lg 
                                   hover:shadow-xl active:scale-95"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Add Info
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto p-4 sm:p-6">
                {error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <>
                        {/* Top Cards Grid */}
                        <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6">
                            <Weather
                                className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 sm:p-6 border border-green-300"
                            />                         
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 mb-6">
                        <Revenue
                                revenue={farmerData.revenue}
                                className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 sm:p-6 border border-green-300"
                            />
                            <Land
                                land={farmerData.land}
                                className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 sm:p-6 border border-green-300"
                            />
                        </div>

                        {/* Bottom Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
                            <ProductionChart
                                data={farmerData.production}
                                className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 sm:p-6 border border-green-300"
                            />
                            <StoragePieChart
                                storage={farmerData.storage}
                                className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 sm:p-6 border border-green-300"
                            />
                        </div>

                        {/* Todo List and Expense Tracker */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
                            <TodoList
                                todos={farmerData.todo}
                                className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 sm:p-6 border border-green-300"
                            />
                            <ExpenseTracker
                                expenses={farmerData.expenses || []}
                                onUpdate={fetchData}
                                className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 sm:p-6 border border-green-300"
                            />
                        </div>
                    </>
                )}
            </main>

            {/* Modals and Floating Buttons */}
            <AddFarmerDataForm
                onDataAdded={fetchData}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Chatbot Modal Button */}
            <button
                onClick={() => setIsChatbotOpen(true)}
                className="fixed bottom-4 right-4 bg-gradient-to-br from-green-600 to-green-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 w-14 h-14 flex items-center justify-center active:scale-95"
            >
                <i className="ri-chat-ai-line text-2xl"></i>
                <span className="sr-only">Open Chatbot</span>
            </button>

            {/* Plant Disease Modal Button */}
            <button
                onClick={() => setIsDiseaseModalOpen(true)}
                className="fixed bottom-24 right-4 bg-gradient-to-br from-green-600 to-green-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 w-14 h-14 flex items-center justify-center active:scale-95"
            >
                <i className="ri-search-eye-line text-2xl"></i>
                <span className="sr-only">Detect Plant Disease</span>
            </button>

            {/* Chatbot Modal */}
            <SimpleChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />

            {/* Plant Disease Modal */}
            <PlantDiseaseModal isOpen={isDiseaseModalOpen} onClose={() => setIsDiseaseModalOpen(false)} />
        </div>
    );
};

export default Dashboard;