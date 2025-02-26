import React from "react";
import { Filter, ChevronDown, Clock } from "lucide-react";

const Filters = () => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center">
        <Filter className="w-4 h-4 text-gray-500 mr-2" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>

      <div className="flex flex-wrap gap-4">
        <button className="flex items-center px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          Category
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>

        <button className="flex items-center px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          Difficulty
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>

        <button className="flex items-center px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Clock className="w-4 h-4 mr-2" />
          Time Horizon
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>

        <button className="flex items-center px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          Sort By
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
      </div>

      <div className="ml-auto">
        <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors text-center">
          Submit Idea
        </button>
      </div>
    </div>
  );
};

export default Filters;
