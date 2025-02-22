import React from "react";
import Navigation from "@/components/shared/Navigation";
import { ExternalLink, Clock, Calendar } from "lucide-react";

const MOCK_ARTICLES = [
  {
    title: "The Evolution of Battery Storage Technology: A Deep Dive",
    author: "Alessandro Mendini",
    date: "Mar 15, 2024",
    readTime: "12 min",
    description:
      "An in-depth analysis of current battery storage technologies, emerging trends, and their impact on renewable energy adoption. We explore technical challenges, market dynamics, and future opportunities.",
    category: "Energy",
    tags: ["Battery Storage", "Renewable Energy", "Technology"],
    mediumLink: "#",
    substackLink: "#",
    imageUrl: "https://placeholder.com/800x400",
  },
  {
    title: "AI in Healthcare: Beyond the Hype",
    author: "Sarah Johnson",
    date: "Mar 10, 2024",
    readTime: "15 min",
    description:
      "A comprehensive look at how artificial intelligence is transforming healthcare delivery, from diagnostic tools to personalized medicine. Includes case studies and expert interviews.",
    category: "Healthcare",
    tags: ["AI", "Healthcare", "Innovation"],
    mediumLink: "#",
    substackLink: "#",
    imageUrl: "https://placeholder.com/800x400",
  },
  {
    title: "The Future of Urban Mobility",
    author: "Michael Chen",
    date: "Mar 5, 2024",
    readTime: "10 min",
    description:
      "Exploring how electric vehicles, autonomous driving, and smart city infrastructure are reshaping urban transportation. Analysis of current trends and future scenarios.",
    category: "Mobility",
    tags: ["EVs", "Smart Cities", "Transportation"],
    mediumLink: "#",
    substackLink: "#",
    imageUrl: "https://placeholder.com/800x400",
  },
];

const DeepDives = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Deep-dives
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              In-depth analysis of trending topics and emerging markets in the
              startup ecosystem.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="space-y-8">
            {MOCK_ARTICLES.map((article, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      {article.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        By {article.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={article.mediumLink}
                        className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read on Medium
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={article.substackLink}
                        className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read on Substack
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeepDives;
