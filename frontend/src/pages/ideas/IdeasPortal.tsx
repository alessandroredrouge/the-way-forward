import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/shared/PageLayout";
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
    title: "Local Food Supply Chain Platform",
    category: "Agriculture",
    subcategory: "Supply Chain",
    geographicFocus: "Local Communities",
    dateCreated: "2024-02-24T10:00:00Z",
    dateUpdated: "2024-02-24T10:00:00Z",
    problemStatement:
      "Connecting local farmers directly with consumers and restaurants to reduce food waste and support local economies.",
    solution:
      "A digital platform that enables direct farm-to-table connections, with real-time inventory management and delivery coordination.",
    whyNow:
      "Growing demand for local, sustainable food sources and need to reduce food waste.",
    marketEstimate: 10000000000,
    businessModel:
      "Commission on transactions + Premium features for restaurants",
    technologies: ["React", "Node.js", "Mobile Apps", "GPS Integration"],
    competition: "Traditional distributors, Farmers markets",
    status: "early-stage",
    typeOfAuthor: "User",
    author: "localFoodAdvocate",
    sources: ["USDA Local Food Report", "Food Waste Statistics"],
    votes: 156,
    comments: 67,
    interestedCount: 89,
    timestamp: "1 day ago",
    timeHorizon: "<1 year",
  },
  {
    title: "Smart City Waste Management",
    category: "Environment",
    subcategory: "Urban Tech",
    geographicFocus: "Metropolitan Areas",
    dateCreated: "2024-02-23T15:30:00Z",
    dateUpdated: "2024-02-24T09:00:00Z",
    problemStatement:
      "Inefficient waste collection routes and poor recycling sorting in urban areas.",
    solution:
      "IoT-enabled waste bins with real-time monitoring and AI-powered route optimization.",
    whyNow:
      "Rising urban population and increasing focus on sustainability goals.",
    marketEstimate: 25000000000,
    businessModel: "Hardware sales + SaaS subscription for municipalities",
    technologies: ["IoT", "AI/ML", "GPS", "Cloud Computing"],
    competition: "Traditional waste management companies, Rubicon",
    status: "pilot",
    typeOfAuthor: "Curator",
    author: "greenTech_expert",
    sources: ["UN Urban Development Report", "EPA Waste Statistics"],
    votes: 89,
    comments: 23,
    interestedCount: 34,
    timestamp: "5 hours ago",
    isPremium: true,
    timeHorizon: "<1 year",
  },
  {
    title: "Decentralized Education Platform",
    category: "Education",
    subcategory: "E-learning",
    geographicFocus: "Global",
    dateCreated: "2024-02-24T08:00:00Z",
    dateUpdated: "2024-02-24T08:00:00Z",
    problemStatement:
      "Traditional education systems lack accessibility and verification methods for online credentials.",
    solution:
      "Blockchain-based platform for creating, sharing, and verifying educational content and credentials.",
    whyNow:
      "Remote learning surge and increasing demand for verifiable digital credentials.",
    marketEstimate: 50000000000,
    businessModel: "Freemium + Enterprise licensing for institutions",
    technologies: ["Blockchain", "Smart Contracts", "React", "Node.js"],
    competition: "Coursera, Udemy, edX",
    status: "proven",
    typeOfAuthor: "User",
    author: "eduTech_innovator",
    sources: [
      "World Economic Forum Education Report 2024",
      "UNESCO Digital Learning Stats",
    ],
    votes: 128,
    comments: 45,
    interestedCount: 67,
    timestamp: "2 hours ago",
    timeHorizon: "5-10 years",
  },
];

const IdeasPortal = () => {
  return (
    <PageLayout>
      <div className="w-full max-w-full px-6 sm:px-8 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore & Share Startup Ideas
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover innovative startup ideas across industries, collaborate
            with like-minded entrepreneurs, and bring your vision to life.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600 dark:text-blue-400">⭐</span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Curator's Choice
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {MOCK_CURATOR_IDEAS.map((idea, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6"
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

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex-1 w-full sm:w-auto overflow-x-auto flex items-center gap-4 pb-2 sm:pb-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 whitespace-nowrap">
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
          <Link 
            to="/ideas/submit" 
            className="w-full sm:w-auto px-6 py-2 bg-[#ffbd59] hover:bg-[#e6aa50] text-white rounded-lg transition-colors"
          >
            Submit Idea
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {MOCK_IDEAS.map((idea, index) => (
            <IdeaCard
              key={index}
              title={idea.title}
              category={idea.category}
              subcategory={idea.subcategory}
              geographicFocus={idea.geographicFocus}
              dateCreated={idea.dateCreated}
              dateUpdated={idea.dateUpdated}
              problemStatement={idea.problemStatement}
              solution={idea.solution}
              whyNow={idea.whyNow}
              marketEstimate={idea.marketEstimate}
              businessModel={idea.businessModel}
              technologies={idea.technologies}
              competition={idea.competition}
              status={idea.status}
              typeOfAuthor={idea.typeOfAuthor}
              author={idea.author}
              sources={idea.sources}
              votes={idea.votes}
              comments={idea.comments}
              interestedCount={idea.interestedCount}
              timestamp={idea.timestamp}
              isPremium={idea.isPremium}
              timeHorizon={idea.timeHorizon}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default IdeasPortal;
