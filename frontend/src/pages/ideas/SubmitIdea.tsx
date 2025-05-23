import React, { useState, useEffect } from "react";
import Navigation from "@/components/shared/Navigation";
import PageLayout from "@/components/shared/PageLayout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/lib/supabase";

// Import the challenges data from the Challenges page
import { CHALLENGES } from "@/pages/challenges/Challenges";

// Define the accepted author types
enum AuthorType {
  Individual = "Individual",
  Company = "Company",
  Agent = "Agent",
  Curator = "Curator",
  Other = "Other",
}

interface IdeaFormData {
  title: string;
  humanity_challenge: string;
  category: string;
  sub_category: string;
  geographic_focus: string;
  time_horizon: string;
  problem_statement: string;
  solution: string;
  why_now: string;
  market_estimate: number;
  business_model: string;
  technologies: string[];
  competition: string;
  status: string;
  type_of_author: AuthorType; // Updated to use enum
  author: string;
  sources: string[];
  // Optional fields
  ideal_customer_profile?: string;
  skills_required?: string[];
  potential_investors?: string[];
  potential_customers?: string[];
  contacts?: string[];
  collaboration_groups?: string[];
  similar_ideas?: string[];
  other?: string;
  supporting_material?: any;
  is_featured?: boolean;
  is_published?: boolean;
}

const SubmitIdea = () => {
  const { user } = useAuth();
  const { profile } = useUserProfile(user);
  const navigate = useNavigate();
  const [ideaDescription, setIdeaDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isImprovingDescription, setIsImprovingDescription] = useState(false);
  const [formData, setFormData] = useState<IdeaFormData>({
    title: "",
    humanity_challenge: "",
    category: "",
    sub_category: "",
    geographic_focus: "",
    time_horizon: "",
    problem_statement: "",
    solution: "",
    why_now: "",
    market_estimate: 0,
    business_model: "",
    technologies: [],
    competition: "",
    status: "early-stage",
    type_of_author: AuthorType.Individual, // Default value, will be updated from user profile
    author: "", // Will be filled with username
    sources: [],
    is_published: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [aiAssisted, setAiAssisted] = useState<boolean>(false);

  // Set author and type_of_author from user profile when component mounts
  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        author: profile.username || user?.email || "",
        type_of_author:
          (profile.type_of_user as AuthorType) || AuthorType.Individual,
      }));
    }
  }, [profile, user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof IdeaFormData
  ) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({ ...prev, [field]: values }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value) || 0;

    if (name === "market_estimate") {
      // Convert millions to the actual value (multiply by 1,000,000)
      // No limit applied - allow any value
      const actualValue = parsedValue * 1000000;
      setFormData((prev) => ({ ...prev, [name]: actualValue }));
    } else {
      // For other number fields, use the original logic
      setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    }
  };

  // This function will call the LLM API
  const analyzeWithAI = async () => {
    if (!ideaDescription.trim()) {
      setError("Please provide a description of your idea first");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Call the backend API to analyze the idea description
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/agents/analyze-idea`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: ideaDescription }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to analyze idea");
      }

      // Get the form data from the response
      const data = await response.json();

      // Preserve the author and type_of_author fields from the current formData
      setFormData((prevData) => ({
        ...data.form_data,
        author: prevData.author,
        type_of_author: prevData.type_of_author,
      }));

      setAiAssisted(true);

      // Scroll to the form section
      const formElement = document.getElementById("idea-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to analyze your idea"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImproveDescription = async () => {
    if (!ideaDescription.trim()) {
      setError("Please provide a description of your idea first");
      return;
    }

    setIsImprovingDescription(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/llms/improve-text`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: ideaDescription }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to improve description");
      }

      const data = await response.json();
      setIdeaDescription(data.improved_text);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to improve description"
      );
    } finally {
      setIsImprovingDescription(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Ensure user is authenticated
    if (!user) {
      setError("You must be logged in to submit an idea");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create submission data with creator_id
      const submissionData = {
        ...formData,
        creator_id: user.id, // Add the creator_id from the authenticated user
      };

      // Use Supabase client to insert the idea
      const { data, error: supabaseError } = await supabase
        .from("ideas")
        .insert([submissionData])
        .select()
        .single();

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      console.log("Idea submitted successfully:", data);

      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        title: "",
        humanity_challenge: "",
        category: "",
        sub_category: "",
        geographic_focus: "",
        time_horizon: "",
        problem_statement: "",
        solution: "",
        why_now: "",
        market_estimate: 0,
        business_model: "",
        technologies: [],
        competition: "",
        status: "early-stage",
        type_of_author:
          (profile?.type_of_user as AuthorType) || AuthorType.Individual,
        author: profile?.username || profile?.email || "",
        sources: [],
        is_published: true,
      });
      setIdeaDescription("");
      setAiAssisted(false);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit your idea"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/ideas"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Ideas
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Submit Your Idea
            </h1>

            {success ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Your idea has been submitted successfully!
              </div>
            ) : null}

            {error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            ) : null}

            {/* AI-Assisted Idea Description */}
            <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Describe Your Idea
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Describe your idea in detail and our AI Agent will help you fill
                out the form. You can review and edit the information before
                submitting.
              </p>
              <textarea
                value={ideaDescription}
                onChange={(e) => setIdeaDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white mb-4"
                placeholder="Describe your idea here in as much detail as possible. What problem does it solve? How does it work? What technologies does it use? What's the market potential?"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleImproveDescription}
                  disabled={isImprovingDescription || !ideaDescription.trim()}
                  className={`px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center ${
                    isImprovingDescription || !ideaDescription.trim()
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isImprovingDescription ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Improving...
                    </>
                  ) : (
                    <>✨ Improve Text</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={analyzeWithAI}
                  disabled={isAnalyzing || !ideaDescription.trim()}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center ${
                    isAnalyzing || !ideaDescription.trim()
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    "🤖 Fill Form"
                  )}
                </button>
              </div>
              {aiAssisted && (
                <div className="mt-4 text-sm text-green-600 dark:text-green-400">
                  ✓ The AI Agents' Crew has analyzed your idea. Please review
                  the form below and make any necessary adjustments.
                </div>
              )}
            </div>

            <form id="idea-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Basic Information
                </h2>

                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="humanity_challenge"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Humanity Challenge *
                  </label>
                  <select
                    id="humanity_challenge"
                    name="humanity_challenge"
                    value={formData.humanity_challenge}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select a challenge</option>
                    {CHALLENGES.map((challenge) => (
                      <option key={challenge.id} value={challenge.name}>
                        {challenge.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Category *
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                      placeholder="Enter a category"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sub_category"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Sub-Category *
                    </label>
                    <input
                      type="text"
                      id="sub_category"
                      name="sub_category"
                      value={formData.sub_category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="geographic_focus"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Geographic Focus *
                    </label>
                    <input
                      type="text"
                      id="geographic_focus"
                      name="geographic_focus"
                      value={formData.geographic_focus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="time_horizon"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Time Horizon *
                    </label>
                    <select
                      id="time_horizon"
                      name="time_horizon"
                      value={formData.time_horizon}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Select time horizon</option>
                      <option value="<1 year">Less than 1 year</option>
                      <option value="1-5 years">1-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value=">10 years">More than 10 years</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Problem & Solution
                </h2>

                <div>
                  <label
                    htmlFor="problem_statement"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Problem Statement *
                  </label>
                  <textarea
                    id="problem_statement"
                    name="problem_statement"
                    value={formData.problem_statement}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="solution"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Solution *
                  </label>
                  <textarea
                    id="solution"
                    name="solution"
                    value={formData.solution}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="why_now"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Why Now? *
                  </label>
                  <textarea
                    id="why_now"
                    name="why_now"
                    value={formData.why_now}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Business & Market */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Business & Market
                </h2>

                <div>
                  <label
                    htmlFor="market_estimate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Market Estimate (Million USD) *
                  </label>
                  <input
                    type="number"
                    id="market_estimate"
                    name="market_estimate"
                    value={formData.market_estimate / 1000000}
                    onChange={handleNumberInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="business_model"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Business Model *
                  </label>
                  <textarea
                    id="business_model"
                    name="business_model"
                    value={formData.business_model}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="technologies"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Technologies (comma separated) *
                  </label>
                  <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    value={formData.technologies.join(", ")}
                    onChange={(e) => handleArrayInputChange(e, "technologies")}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="AI, Blockchain, IoT, etc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="competition"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Competition *
                  </label>
                  <textarea
                    id="competition"
                    name="competition"
                    value={formData.competition}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Additional Information
                </h2>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="early-stage">Early Stage</option>
                    <option value="pilot">Pilot</option>
                    <option value="proven">Proven</option>
                    <option value="scaling">Scaling</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="sources"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Sources (comma separated) *
                  </label>
                  <input
                    type="text"
                    id="sources"
                    name="sources"
                    value={formData.sources.join(", ")}
                    onChange={(e) => handleArrayInputChange(e, "sources")}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="Research papers, articles, etc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="type_of_author"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Author Type *
                  </label>
                  <select
                    id="type_of_author"
                    name="type_of_author"
                    value={formData.type_of_author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-white bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
                    required
                    disabled
                  >
                    {Object.values(AuthorType).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Set by your user profile
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Author *
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-white bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
                    required
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Set by your user profile
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="ideal_customer_profile"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Ideal Customer Profile (optional)
                  </label>
                  <textarea
                    id="ideal_customer_profile"
                    name="ideal_customer_profile"
                    value={formData.ideal_customer_profile || ""}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="skills_required"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Skills Required (comma separated, optional)
                  </label>
                  <input
                    type="text"
                    id="skills_required"
                    name="skills_required"
                    value={formData.skills_required?.join(", ") || ""}
                    onChange={(e) =>
                      handleArrayInputChange(e, "skills_required")
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Programming, Marketing, Design, etc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="other"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Other Information (optional)
                  </label>
                  <textarea
                    id="other"
                    name="other"
                    value={formData.other || ""}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="potential_investors"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Potential Investors (comma separated, optional)
                  </label>
                  <input
                    type="text"
                    id="potential_investors"
                    name="potential_investors"
                    value={formData.potential_investors?.join(", ") || ""}
                    onChange={(e) =>
                      handleArrayInputChange(e, "potential_investors")
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Investor names or organizations"
                  />
                </div>

                <div>
                  <label
                    htmlFor="potential_customers"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Potential Customers (comma separated, optional)
                  </label>
                  <input
                    type="text"
                    id="potential_customers"
                    name="potential_customers"
                    value={formData.potential_customers?.join(", ") || ""}
                    onChange={(e) =>
                      handleArrayInputChange(e, "potential_customers")
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Target customer segments or organizations"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contacts"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Contacts (comma separated, optional)
                  </label>
                  <input
                    type="text"
                    id="contacts"
                    name="contacts"
                    value={formData.contacts?.join(", ") || ""}
                    onChange={(e) => handleArrayInputChange(e, "contacts")}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Key contacts for this idea"
                  />
                </div>

                <div>
                  <label
                    htmlFor="collaboration_groups"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Collaboration Groups (comma separated, optional)
                  </label>
                  <input
                    type="text"
                    id="collaboration_groups"
                    name="collaboration_groups"
                    value={formData.collaboration_groups?.join(", ") || ""}
                    onChange={(e) =>
                      handleArrayInputChange(e, "collaboration_groups")
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Groups interested in collaborating"
                  />
                </div>

                <div>
                  <label
                    htmlFor="similar_ideas"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Similar Ideas (comma separated, optional)
                  </label>
                  <input
                    type="text"
                    id="similar_ideas"
                    name="similar_ideas"
                    value={formData.similar_ideas?.join(", ") || ""}
                    onChange={(e) => handleArrayInputChange(e, "similar_ideas")}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Related or similar ideas"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-[#ffbd59] text-white rounded-md hover:bg-[#e6aa50] transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Idea"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SubmitIdea;
