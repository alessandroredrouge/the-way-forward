import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/shared/PageLayout";
import IdeaCard from "@/components/ideas/IdeaCard";
import Filters from "@/components/ideas/Filters";

// TODO: Uncomment and implement Curator's Choice when ready
// const MOCK_CURATOR_IDEAS = [
//   {
//     title: "AI-Powered Personal Shopping Assistant",
//     category: "AI/ML",
//     curator: "Sarah Johnson",
//     description:
//       "A smart shopping assistant that learns user preferences and provides personalized recommendations across multiple e-commerce platforms.",
//   },
//   {
//     title: "Sustainable Energy Marketplace",
//     category: "Energy",
//     curator: "Michael Chen",
//     description:
//       "A platform connecting renewable energy producers with consumers, facilitating direct energy trading and promoting sustainable practices.",
//   },
//   {
//     title: "Healthcare IoT Integration Platform",
//     category: "Healthcare",
//     curator: "Dr. Emily Brown",
//     description:
//       "An integrated system for managing and analyzing data from various healthcare IoT devices, improving patient care and monitoring.",
//   },
// ];

// Define the Idea interface based on the backend schema
interface Idea {
  id: string;
  title: string;
  category: string;
  sub_category: string;
  geographic_focus: string;
  created_at: string;
  updated_at: string;
  problem_statement: string;
  solution: string;
  why_now: string;
  market_estimate: number;
  business_model: string;
  technologies: string[];
  competition: string;
  status: string;
  type_of_author: string;
  author: string;
  sources: string[];
  upvotes: number;
  downvotes: number;
  views: number;
  time_horizon: string;
  humanity_challenge: string;
  // Optional fields
  ideal_customer_profile?: string;
  skills_required?: string[];
  other?: string;
}

const IdeasPortal = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isIdeaDialogOpen, setIsIdeaDialogOpen] = useState<boolean>(false);

  // Function to handle dialog open/close state
  const handleDialogState = (isOpen: boolean) => {
    setIsIdeaDialogOpen(isOpen);

    // Immediately update sticky state when dialog opens/closes
    if (isOpen) {
      setIsSticky(false); // Hide sticky header when dialog opens
    } else {
      // Check if we should show sticky header based on scroll position
      const filterSection = document.getElementById("filter-section");
      if (filterSection) {
        const filterPosition = filterSection.getBoundingClientRect().top;
        setIsSticky(filterPosition < 0);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Get the position of the filter section
      const filterSection = document.getElementById("filter-section");
      if (filterSection) {
        const filterPosition = filterSection.getBoundingClientRect().top;
        // If the filter section is above the viewport, show the sticky header
        // But only if no idea dialog is open
        setIsSticky(filterPosition < 0 && !isIdeaDialogOpen);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isIdeaDialogOpen]); // Add isIdeaDialogOpen as a dependency

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/v1/ideas/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          mode: "cors",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch ideas");
        }

        const data = await response.json();
        console.log("Ideas data received from backend:", data);
        setIdeas(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching ideas"
        );
        console.error("Error fetching ideas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  return (
    <PageLayout>
      {isSticky && !isIdeaDialogOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-md py-2 sm:py-3 px-4 sm:px-6 md:px-12 animate-fade-down border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 overflow-x-auto flex items-center gap-2 sm:gap-4 pb-2 sm:pb-0 no-scrollbar">
                <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 whitespace-nowrap text-sm">
                  <span>Filters</span>
                  <span className="text-gray-400">3</span>
                </button>
                <select className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 border-0 text-sm">
                  <option>Category</option>
                </select>
                <select className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 border-0 text-sm">
                  <option>Difficulty</option>
                </select>
                <select className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 border-0 text-sm">
                  <option>Sort By</option>
                </select>
              </div>
              <Link
                to="/ideas/submit"
                className="flex-shrink-0 px-4 sm:px-6 py-1.5 sm:py-2 bg-[#ffbd59] hover:bg-[#e6aa50] text-white rounded-lg transition-colors text-center text-sm sm:text-base"
              >
                Submit Idea
              </Link>
            </div>
          </div>
        </div>
      )}

      <div
        className={`w-full max-w-full px-6 sm:px-8 md:px-12 ${
          isSticky ? "pt-16 sm:pt-14" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore & Share Startup Ideas
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover innovative startup ideas across industries, collaborate
            with like-minded entrepreneurs, and bring your vision to life.
          </p>
        </div>

        {/* TODO: Implement Curator's Choice section when ready 
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
        */}

        <div
          id="filter-section"
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        >
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
            className="w-full sm:w-auto px-6 py-2 bg-[#ffbd59] hover:bg-[#e6aa50] text-white rounded-lg transition-colors text-center"
          >
            Submit Idea
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffbd59]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No ideas found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Be the first to submit an idea!
            </p>
            <Link
              to="/ideas/submit"
              className="px-6 py-2 bg-[#ffbd59] hover:bg-[#e6aa50] text-white rounded-lg transition-colors text-center"
            >
              Submit Idea
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 auto-rows-fr">
            {ideas.map((idea) => (
              <IdeaCard
                key={idea.id}
                title={idea.title || "Untitled Idea"}
                category={idea.category || "Uncategorized"}
                sub_category={idea.sub_category || ""}
                geographicFocus={idea.geographic_focus || "Global"}
                dateCreated={idea.created_at || new Date().toISOString()}
                dateUpdated={idea.updated_at || new Date().toISOString()}
                problemStatement={idea.problem_statement || ""}
                solution={idea.solution || ""}
                whyNow={idea.why_now || ""}
                marketEstimate={idea.market_estimate || 0}
                businessModel={idea.business_model || ""}
                technologies={idea.technologies || []}
                competition={idea.competition || ""}
                status={idea.status || "early-stage"}
                typeOfAuthor={idea.type_of_author || ""}
                author={idea.author || "Anonymous"}
                sources={idea.sources || []}
                votes={idea.upvotes || 0}
                comments={0} // This might need to be implemented later
                interestedCount={idea.views || 0}
                timestamp={new Date(
                  idea.created_at || new Date()
                ).toLocaleDateString()}
                timeHorizon={idea.time_horizon || "Short-term"}
                humanityChallenge={idea.humanity_challenge || "General"}
                skillsRequired={idea.skills_required || []}
                idealCustomerProfile={idea.ideal_customer_profile || ""}
                other={idea.other || ""}
                onDialogOpen={() => handleDialogState(true)}
                onDialogClose={() => handleDialogState(false)}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default IdeasPortal;
