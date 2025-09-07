import React from "react";

export const TopBar = ({ onAddWidget, onSearchChange, searchValue }) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      <h1 className="text-lg md:text-xl font-semibold text-slate-700">
        CNAPP Dashboard
      </h1>


      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search widgets"
          className="px-3 py-2 border rounded-md shadow-sm outline-none  w-full sm:w-64"
        />
        <button
          onClick={onAddWidget}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow w-full sm:w-auto">
          + Add Widget
        </button>
      </div>
    </div>
  );
};
