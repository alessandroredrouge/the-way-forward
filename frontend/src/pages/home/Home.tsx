import React from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/shared/Navigation";

const Home = () => {
  const features = [
    {
      title: "Ideas Portal",
      description: "Discover and share innovative startup ideas across industries",
      icon: "💡",
      link: "/ideas"
    },
    {
      title: "Podcast",
      description: "Listen to industry experts discuss challenges and opportunities",
      icon: "🎙️",
      link: "/podcast"
    },
    {
      title: "Deep-dives",
      description: "In-depth analysis of trending topics and emerging markets",
      icon: "📚",
      link: "/deep-dives"
    },
    {
      title: "Resources",
      description: "Curated collection of tools and guides for entrepreneurs",
      icon: "🔧",
      link: "/resources"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-up">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            The Way Forward
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Your platform for discovering, sharing, and building the next generation of innovative startups.
          </p>
          <Link
            to="/ideas"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Explore Ideas
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h2>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Share Your Idea?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community of innovators and bring your vision to life.
          </p>
          <Link
            to="/ideas/submit"
            className="inline-block px-8 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            Submit Your Idea
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;