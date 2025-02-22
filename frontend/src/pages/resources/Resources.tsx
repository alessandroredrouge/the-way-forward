import React from "react";
import Navigation from "@/components/shared/Navigation";
import {
  ExternalLink,
  Book,
  Code,
  Lightbulb,
  Battery,
  Activity,
} from "lucide-react";

const MOCK_RESOURCES = {
  "Energy & Cleantech": [
    {
      title: "Energy Storage News",
      description:
        "Latest updates and analysis on energy storage technologies and markets.",
      url: "#",
      type: "News Platform",
    },
    {
      title: "CleanTech Forum",
      description:
        "Leading community for cleantech innovation and investment opportunities.",
      url: "#",
      type: "Community",
    },
  ],
  "Artificial Intelligence": [
    {
      title: "AI Research Papers",
      description:
        "Collection of latest research papers in AI and machine learning.",
      url: "#",
      type: "Research",
    },
    {
      title: "ML Engineering Best Practices",
      description:
        "Comprehensive guide for implementing ML systems in production.",
      url: "#",
      type: "Guide",
    },
  ],
  "Healthcare Innovation": [
    {
      title: "Digital Health Today",
      description: "Platform covering digital transformation in healthcare.",
      url: "#",
      type: "News Platform",
    },
    {
      title: "HealthTech Standards",
      description:
        "Regulatory guidelines and standards for healthcare technology.",
      url: "#",
      type: "Documentation",
    },
  ],
};

const Resources = () => {
  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case "Energy & Cleantech":
        return <Battery className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case "Artificial Intelligence":
        return <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case "Healthcare Innovation":
        return (
          <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        );
      default:
        return <Book className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Resources
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Curated collection of valuable resources to help you explore and
              understand different industries.
            </p>
          </div>

          {/* Resources by Category */}
          <div className="space-y-8">
            {Object.entries(MOCK_RESOURCES).map(([category, resources]) => (
              <div
                key={category}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  {renderCategoryIcon(category)}
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {category}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {resources.map((resource, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            {resource.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                            {resource.description}
                          </p>
                          <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                            {resource.type}
                          </span>
                        </div>
                        <a
                          href={resource.url}
                          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resources;
