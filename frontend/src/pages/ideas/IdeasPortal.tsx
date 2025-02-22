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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore & Share Startup Ideas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover innovative startup ideas across industries, collaborate
            with like-minded entrepreneurs, and bring your vision to life.
          </p>
        </div>

        <CuratorChoice ideas={MOCK_CURATOR_IDEAS} />
        <Filters />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_IDEAS.map((idea, index) => (
            <IdeaCard key={index} {...idea} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default IdeasPortal;
