import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                console.log('Token:', token); // Log the token for debugging

                const response = await fetch('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // Log the response for debugging
                const responseText = await response.text();
                console.log('Response:', responseText);

                // Check if the response is JSON
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error(`Response is not JSON. Content: ${responseText}`);
                }

                const data = JSON.parse(responseText); // Parse the response text as JSON

                if (!response.ok) {
                    throw new Error(data.error || 'Network response was not ok');
                }

                setUserName(data.name); // Assuming the response has a 'name' field
            } catch (error) {
                console.error('Error fetching user name:', error);
                // Redirect to login page or show an error message
            }
        };

        fetchUserName();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-green-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img 
                            src="/agrivo.png" 
                            alt="Agrivo Logo" 
                            className="h-10" 
                        />
                        <span className="ml-2 text-xl font-bold text-green-800">Agrivo</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">
                        <Link 
                            to="/" 
                            className="text-sm font-semibold text-gray-700 hover:text-green-700 transition-all duration-200"
                        >
                            Home
                        </Link>
                        
                        <Link 
                            to="/chatbot" 
                            className="text-sm font-semibold text-gray-700 hover:text-green-700 transition-all duration-200"
                        >
                            Chatbot
                        </Link>
                    </div>

                    {/* User Name and Icon */}
                    {userName && (
                        <div className="flex items-center space-x-2">
                            <img 
                                src="/user-icon.png" 
                                alt="User Icon" 
                                className="h-8 w-8 rounded-full" 
                            />
                            <span className="text-sm font-semibold text-gray-700">{userName}</span>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;