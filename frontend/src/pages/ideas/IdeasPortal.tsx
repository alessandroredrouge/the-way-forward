import React from "react";
import Navigation from "@/components/shared/Navigation";
import IdeaCard from "@/components/ideas/IdeaCard";
import CuratorChoice from "@/components/ideas/CuratorChoice";
import Filters from "@/components/ideas/Filters";

const MOCK_CURATOR_IDEAS = [
  {
    title: "AI-Powered Personal Shopping Assistant",
    category: "AI/ML",
    curator: "Sarah Johnson",
    description:
      "A smart shopping assistant that learns user preferences and provides personalized recommendations across multiple e-commerce platforms.",
  },
  {
    title: "Sustainable Energy Marketplace",
    category: "Energy",
    curator: "Michael Chen",
    description:
      "A platform connecting renewable energy producers with consumers, facilitating direct energy trading and promoting sustainable practices.",
  },
  {
    title: "Healthcare IoT Integration Platform",
    category: "Healthcare",
    curator: "Dr. Emily Brown",
    description:
      "An integrated system for managing and analyzing data from various healthcare IoT devices, improving patient care and monitoring.",
  },
];

const MOCK_IDEAS = [
  {
    title: "Decentralized Education Platform",
    category: "Education",
    subcategory: "E-learning",
    difficulty: "Moderate" as const,
    problemStatement:
      "Creating accessible, verified educational content through blockchain technology and peer review systems.",
    votes: 128,
    comments: 45,
    interestedCount: 67,
    timestamp: "2 hours ago",
  },
  {
    title: "Smart City Waste Management",
    category: "Environment",
    subcategory: "Urban Tech",
    difficulty: "Advanced" as const,
    problemStatement:
      "IoT-enabled waste bins and routing optimization for efficient city waste collection and recycling.",
    votes: 89,
    comments: 23,
    interestedCount: 34,
    timestamp: "5 hours ago",
    isPremium: true,
  },
  {
    title: "Local Food Supply Chain Platform",
    category: "Agriculture",
    subcategory: "Supply Chain",
    difficulty: "Easy" as const,
    problemStatement:
      "Connecting local farmers directly with consumers and restaurants to reduce food waste and support local economies.",
    votes: 156,
    comments: 67,
    interestedCount: 89,
    timestamp: "1 day ago",
  },
];

const IdeasPortal = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore & Share Startup Ideas
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover innovative startup ideas across industries, collaborate
            with like-minded entrepreneurs, and bring your vision to life.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600 dark:text-blue-400">⭐</span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Curator's Choice
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_CURATOR_IDEAS.map((idea, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
              >
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {idea.category}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {idea.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {idea.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Curated by {idea.curator}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="overflow-x-auto flex-1 -mx-4 px-4">
            <div className="flex items-center gap-4 min-w-max">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300">
                <span>Filters</span>
                <span className="text-gray-400">3</span>
              </button>
              <select className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 border-0">
                <option>Category</option>
              </select>
              <select className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 border-0">
                <option>Difficulty</option>
              </select>
              <select className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 border-0">
                <option>Sort By</option>
              </select>
            </div>
          </div>
          <button className="flex-shrink-0 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Submit Idea
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_IDEAS.map((idea, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {idea.category}
                  </span>
                  <span className="mx-2 text-gray-300 dark:text-gray-600">
                    •
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {idea.subcategory}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    idea.difficulty === "Easy"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : idea.difficulty === "Moderate"
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                      : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  }`}
                >
                  {idea.difficulty}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {idea.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {idea.problemStatement}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 dark:text-gray-400">
                    👍 {idea.votes}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    💬 {idea.comments}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    👥 {idea.interestedCount}
                  </span>
                </div>
                <span className="text-gray-400 dark:text-gray-500">
                  {idea.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default IdeasPortal;
