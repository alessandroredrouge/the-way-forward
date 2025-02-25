import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/shared/PageLayout";
import logoSvg from "@/assets/icons/The Way Forward - Logo Circular.svg";

const Home = () => {
  const features = [
    {
      title: "Humanity's Challenges",
      description:
        "An up-to-date overview on humanity's most pressing challenges",
      icon: "🌍",
      link: "/challenges",
    },
    {
      title: "Ideas Portal",
      description:
        "A collection of ideas and solutions to make a difference",
      icon: "🎯",
      link: "/ideas",
    },
    {
      title: "Podcast",
      description:
        "Deep conversations with visionaries shaping tomorrow's solutions",
      icon: "🎙️",
      link: "/podcast",
    },
    {
      title: "Deep-dives",
      description:
        "Comprehensive analysis of breakthrough solutions and their potential impact",
      icon: "🔍",
      link: "/deep-dives",
    },
    {
      title: "Community",
      description:
        "Join forces with brilliant minds dedicated to moving humanity forward",
      icon: "🌟",
      link: "/community",
    },
    {
      title: "Knowledge Hub",
      description:
        "Essential resources and insights for creating meaningful change",
      icon: "📚",
      link: "/resources",
    },
  ];

  return (
    <PageLayout>
      <div className="w-full max-w-full">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-up">
          <div className="mb-8">
            <img
              src={logoSvg}
              alt="The Way Forward Logo"
              className="w-20 md:w-32 lg:w-48 mx-auto h-auto"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            The Way Forward
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            The source of truth for everything that matters - creating a bridge between today's challenges and tomorrow's solutions for humanity's prosperity.
          </p>
          <Link
            to="/ideas"
            className="inline-block text-lg sm:text-xl text-[#ffbd59] hover:text-[#e6aa50] transition-colors flex items-center justify-center"
          >
            <span className="mr-2">Learn how you can make a difference</span>
            <span className="animate-pulse">⬇️</span>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl sm:text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Shape the Future?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8">
            Share your insights and solutions to help build the future we all
            want to see.
          </p>
          <Link
            to="/ideas/submit"
            className="inline-block px-6 sm:px-8 py-3 bg-[#ffbd59] text-white rounded-md hover:bg-[#e6aa50] transition-colors"
          >
            Contribute Solution
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
