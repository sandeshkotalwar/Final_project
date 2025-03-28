import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl bg-transparent border-none cursor-pointer"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;