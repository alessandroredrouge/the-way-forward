
import React from "react";
import { Star } from "lucide-react";

interface CuratorChoiceProps {
  ideas: Array<{
    title: string;
    category: string;
    curator: string;
    description: string;
  }>;
}

const CuratorChoice = ({ ideas }: CuratorChoiceProps) => {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 mb-8">
      <div className="flex items-center mb-6">
        <Star className="w-6 h-6 text-primary mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Curator's Choice</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="text-xs font-medium text-gray-500 mb-2">
              {idea.category}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {idea.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {idea.description}
            </p>
            <div className="text-xs text-gray-500">
              Curated by {idea.curator}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuratorChoice;
