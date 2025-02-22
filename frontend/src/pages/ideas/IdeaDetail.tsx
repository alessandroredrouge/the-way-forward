import React from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/shared/Navigation";

const IdeaDetail = () => {
  const { id } = useParams();

  // This is a placeholder. In the real implementation, we would fetch the idea details using the id
  const mockIdea = {
    title: "AI-Powered Personal Shopping Assistant",
    category: "AI/ML",
    subcategory: "Consumer Tech",
    difficulty: "Moderate" as const,
    curator: "Sarah Johnson",
    description:
      "A smart shopping assistant that learns user preferences and provides personalized recommendations across multiple e-commerce platforms.",
    problemStatement:
      "Online shoppers struggle to find the best products across multiple platforms and often miss out on deals or items that match their preferences.",
    votes: 128,
    comments: 45,
    interestedCount: 67,
    timestamp: "2 hours ago",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {mockIdea.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {mockIdea.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {mockIdea.subcategory}
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              {mockIdea.difficulty}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Problem Statement</h2>
            <p className="text-gray-700">{mockIdea.problemStatement}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{mockIdea.description}</p>
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">👍</span>
                <span>{mockIdea.votes}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">💬</span>
                <span>{mockIdea.comments}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">👥</span>
                <span>{mockIdea.interestedCount}</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Show Interest
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IdeaDetail;
