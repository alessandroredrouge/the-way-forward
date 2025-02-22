import React from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/shared/Navigation";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/ideas"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Ideas
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {mockIdea.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {mockIdea.category}
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                {mockIdea.subcategory}
              </span>
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">
                {mockIdea.difficulty}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Problem Statement
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {mockIdea.problemStatement}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {mockIdea.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-t dark:border-gray-700 pt-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">👍</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {mockIdea.votes}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">💬</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {mockIdea.comments}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">👥</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {mockIdea.interestedCount}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-[#ffbd59] text-white rounded-md hover:bg-[#e6aa50] transition-colors">
                Show Interest
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IdeaDetail;
