import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/shared/PageLayout";
import IdeaCard from "@/components/ideas/IdeaCard";
import Filters from "@/components/ideas/Filters";
import { CHALLENGES } from "@/pages/challenges/Challenges";

// Define the Idea interface based on the backend schema
interface Idea {
  id: string;
  title: string;
  category: string;
  sub_category: string;
  geographic_focus: string;
  date_created: string;
  date_updated: string;
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

// Define sort options
type SortOption = "newest" | "oldest";

const IdeasPortal = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isIdeaDialogOpen, setIsIdeaDialogOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Filter and sort states
  const [selectedChallenge, setSelectedChallenge] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Function to handle dialog open/close state
  const handleDialogState = (isOpen: boolean) => {
    setIsIdeaDialogOpen(isOpen);

    // Immediately update sticky state when dialog opens/closes
    if (isOpen) {
      setIsSticky(false); // Hide sticky header when dialog opens
      setScrollProgress(0);
    } else {
      // Check if we should show sticky header based on scroll position
      const filterSection = document.getElementById("filter-section");
      if (filterSection) {
        const filterPosition = filterSection.getBoundingClientRect().top;
        const threshold = 100; // Adjust this value to control when the transition starts

        if (filterPosition < threshold) {
          // Calculate scroll progress (0 to 1)
          const progress = Math.min(
            1,
            Math.max(0, (threshold - filterPosition) / threshold)
          );
          setScrollProgress(progress);
          setIsSticky(filterPosition < 0);
        } else {
          setScrollProgress(0);
          setIsSticky(false);
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Don't update if dialog is open
      if (isIdeaDialogOpen) return;

      // Get the position of the filter section
      const filterSection = document.getElementById("filter-section");
      if (filterSection) {
        const filterPosition = filterSection.getBoundingClientRect().top;
        const threshold = 100; // Adjust this value to control when the transition starts

        if (filterPosition < threshold) {
          // Calculate scroll progress (0 to 1)
          const progress = Math.min(
            1,
            Math.max(0, (threshold - filterPosition) / threshold)
          );
          setScrollProgress(progress);
          setIsSticky(filterPosition < 0);
        } else {
          setScrollProgress(0);
          setIsSticky(false);
        }
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
        // Use environment variable instead of hardcoded URL
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiUrl}/api/v1/ideas/`, {
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

  // Apply filters and sorting whenever the filter/sort options or ideas change
  useEffect(() => {
    if (!ideas.length) return;

    let result = [...ideas];

    // Apply challenge filter
    if (selectedChallenge) {
      result = result.filter(
        (idea) => idea.humanity_challenge === selectedChallenge
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.date_created).getTime() -
          new Date(a.date_created).getTime()
        );
      } else {
        return (
          new Date(a.date_created).getTime() -
          new Date(b.date_created).getTime()
        );
      }
    });

    setFilteredIdeas(result);
  }, [ideas, selectedChallenge, sortBy]);

  // Handle challenge filter change
  const handleChallengeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChallenge(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  return (
    <PageLayout>
      {/* Sticky header with transition */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-md py-2 sm:py-3 px-4 sm:px-6 md:px-12 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
          isIdeaDialogOpen ? "opacity-0 -translate-y-full" : ""
        }`}
        style={{
          opacity: scrollProgress,
          transform: `translateY(${
            scrollProgress < 1 ? "-" + (100 - scrollProgress * 100) + "%" : "0"
          })`,
          pointerEvents: scrollProgress > 0.5 ? "auto" : "none",
          boxShadow: `0 ${scrollProgress * 4}px ${
            scrollProgress * 8
          }px rgba(0, 0, 0, ${scrollProgress * 0.1})`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <div className="flex-1 overflow-x-auto flex items-center gap-2 sm:gap-4 pb-2 sm:pb-0 no-scrollbar">
              <select
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 border-0 text-sm"
                value={selectedChallenge}
                onChange={handleChallengeChange}
              >
                <option value="">All Challenges</option>
                {CHALLENGES.map((challenge) => (
                  <option key={challenge.id} value={challenge.name}>
                    {challenge.name}
                  </option>
                ))}
              </select>
              <select
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 border-0 text-sm"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="newest">Most recent first</option>
                <option value="oldest">Oldest first</option>
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

      <div
        className="w-full max-w-full px-6 sm:px-8 md:px-12 transition-all duration-300 ease-in-out"
        style={{
          paddingTop: `${scrollProgress * 56}px`, // Dynamically adjust padding based on scroll progress
        }}
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

        <div
          id="filter-section"
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        >
          <div className="flex-1 w-full sm:w-auto overflow-x-auto flex items-center gap-4 pb-2 sm:pb-0">
            <select
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 border-0"
              value={selectedChallenge}
              onChange={handleChallengeChange}
            >
              <option value="">All Challenges</option>
              {CHALLENGES.map((challenge) => (
                <option key={challenge.id} value={challenge.name}>
                  {challenge.name}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 border-0"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="newest">Most recent first</option>
              <option value="oldest">Oldest first</option>
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
        ) : filteredIdeas.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No ideas found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {selectedChallenge
                ? `No ideas found for the selected challenge "${selectedChallenge}".`
                : "Be the first to submit an idea!"}
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
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea.id}
                id={idea.id}
                title={idea.title || "Untitled Idea"}
                category={idea.category || "Uncategorized"}
                sub_category={idea.sub_category || ""}
                geographicFocus={idea.geographic_focus || "Global"}
                dateCreated={idea.date_created}
                dateUpdated={idea.date_updated}
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
                timestamp={idea.date_created}
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
