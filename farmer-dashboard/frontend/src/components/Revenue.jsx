import React from "react";

const Revenue = ({ revenue }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-900 mb-4">Revenue</h2>
      <p className="text-green-700 font-semibold text-2xl ">₹{revenue}</p>
    </div>
  );
};

export default Revenue;