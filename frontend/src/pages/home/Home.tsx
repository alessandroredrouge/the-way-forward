import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/shared/PageLayout";
import logoSvg from "@/assets/icons/The Way Forward - Logo Circular.svg";

const Home = () => {
  const features = [
    {
      title: "Global Challenges Tracker",
      description:
        "Track and understand humanity's most pressing challenges through real-time data",
      icon: "🌍",
      link: "/challenges",
    },
    {
      title: "Ideas' Portal",
      description:
        "Get inspired by innovative ideas to solve those challenges. Act, today!",
      icon: "💡",
      link: "/ideas",
    },
    {
      title: "Knowledge Hub",
      description:
        "Access curated insights, research, and resources to understand complex global issues and their solutions",
      icon: "📚",
      link: "/knowledge-hub",
    },
    {
      title: "Community",
      description:
        "Connect with changemakers and experts dedicated to solving humanity's greatest challenges",
      icon: "👥",
      link: "/community",
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
            The source of truth for everything that matters - bridging today's
            challenges with tomorrow's solutions for humanity's prosperity.
          </p>
          <Link
            to="/challenges"
            className="inline-block px-6 sm:px-8 py-3 bg-[#ffbd59] text-white rounded-md hover:bg-[#e6aa50] transition-colors mb-4"
          >
            Explore Global Challenges
          </Link>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Understand the challenges. Find solutions. Make an impact.
          </div>
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
            Ready to Make a Difference?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join our community of changemakers and help shape humanity's path to
            prosperity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/challenges"
              className="inline-block px-6 sm:px-8 py-3 bg-[#ffbd59] text-white rounded-md hover:bg-[#e6aa50] transition-colors"
            >
              View Challenges
            </Link>
            <Link
              to="/ideas/submit"
              className="inline-block px-6 sm:px-8 py-3 border-2 border-[#ffbd59] text-[#ffbd59] rounded-md hover:bg-[#ffbd59] hover:text-white transition-colors"
            >
              Propose Solutions
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
