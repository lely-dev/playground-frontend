import React from "react";

export default function SearchBar({ onTypologyChange, onCityChange }) {
  const handleTypologyChange = (e) => {
    if (e && e.target) {
      onTypologyChange(e.target.value);
    }
  };

  const handleCityChange = (e) => {
    if (e && e.target) {
      onCityChange(e.target.value);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center py-4">
        <div className="flex flex-col md:flex-row bg-white shadow-md shadow-shadow-green rounded-lg p-4 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            onChange={handleTypologyChange}
            placeholder="Sport"
            className="px-4 py-2 border border-light-green rounded-md focus:outline-none focus:ring-2 focus:ring-light-green"
          />
          <input
            type="text"
            onChange={handleCityChange}
            placeholder="Città"
            className="px-4 py-2 border border-light-green rounded-md focus:outline-none focus:ring-2 focus:ring-light-green"
          />
        </div>
      </div>
    </>
  );
}
