import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/shared/PageLayout";
import { Headphones, BookOpen, Library } from "lucide-react";

const KnowledgeHub = () => {
  const sections = [
    {
      title: "Podcast",
      description:
        "Deep conversations with visionaries shaping tomorrow's solutions. Listen to thought leaders discuss pathways to a prosperous future.",
      icon: (
        <Headphones className="w-12 h-12 text-blue-600 dark:text-blue-400" />
      ),
      link: "/podcast",
      bgImage: "podcast-bg.jpg",
    },
    {
      title: "Deep-dives",
      description:
        "Comprehensive analysis of breakthrough solutions and their potential impact. In-depth exploration of transformative approaches to global challenges.",
      icon: <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
      link: "/deep-dives",
      bgImage: "deep-dives-bg.jpg",
    },
    {
      title: "External Resources",
      description:
        "Curated collection of valuable resources and insights for creating meaningful change. Essential knowledge to help you understand and tackle global challenges.",
      icon: <Library className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
      link: "/resources",
      bgImage: "resources-bg.jpg",
    },
  ];

  return (
    <PageLayout>
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Knowledge Hub
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive collection of insights, analysis, and
            resources dedicated to understanding and solving humanity's greatest
            challenges.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Link
              key={index}
              to={section.link}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="p-6">
                <div className="mb-4">{section.icon}</div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {section.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {section.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
          ))}
        </div>

        {/* Featured Content Preview */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add featured content previews here if needed */}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default KnowledgeHub;
