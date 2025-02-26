import React, { useState } from "react";
import Navigation from "@/components/shared/Navigation";
import PageLayout from "@/components/shared/PageLayout";

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
  type_of_author: string;
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
}

const SubmitIdea = () => {
  const [ideaDescription, setIdeaDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
    type_of_author: "User",
    author: "",
    sources: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [aiAssisted, setAiAssisted] = useState<boolean>(false);

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
      // In the future, this will be a real API call to the backend
      // const response = await fetch("http://localhost:8000/api/v1/ideas/analyze", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ description: ideaDescription }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.detail || "Failed to analyze idea");
      // }

      // const aiResponse = await response.json();
      // setFormData(aiResponse);

      // For now, we'll simulate a response with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock AI response - in the real implementation, this would come from the LLM
      const mockAiResponse: IdeaFormData = {
        title: "AI-Generated Title Based on Your Description",
        humanity_challenge: "Climate Change and Sustainability",
        category: "Environment",
        sub_category: "Renewable Energy",
        geographic_focus: "Global",
        time_horizon: "5-10 years",
        problem_statement:
          "Your description suggests addressing environmental challenges through innovative technology solutions.",
        solution:
          "A platform that connects renewable energy producers with consumers, facilitating direct energy trading.",
        why_now:
          "Increasing climate concerns and advancements in renewable energy technologies make this the perfect time.",
        market_estimate: 2000000000, // This is 2,000 million (2 billion) in actual value
        business_model: "Subscription-based platform with transaction fees",
        technologies: ["Blockchain", "IoT", "AI", "Cloud Computing"],
        competition:
          "Traditional energy providers, Existing energy marketplaces",
        status: "early-stage",
        type_of_author: "User",
        author: "",
        sources: ["IPCC Report 2023", "Renewable Energy Market Analysis"],
        ideal_customer_profile:
          "Environmentally conscious consumers and businesses looking to reduce carbon footprint",
        skills_required: [
          "Software Development",
          "Energy Market Expertise",
          "Blockchain",
        ],
      };

      setFormData(mockAiResponse);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Try different backend URLs to resolve CORS issues
      const response = await fetch("http://localhost:8000/api/v1/ideas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to submit idea");
      }

      const data = await response.json();
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
        type_of_author: "User",
        author: "",
        sources: [],
      });
      setIdeaDescription("");
      setAiAssisted(false);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-8 pb-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
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
            <div className="flex justify-end">
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
                  "Enhance Idea with AI"
                )}
              </button>
            </div>
            {aiAssisted && (
              <div className="mt-4 text-sm text-green-600 dark:text-green-400">
                ✓ The AI Agent has analyzed your idea. Please review the form
                below and make any necessary adjustments.
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
                <input
                  type="text"
                  id="humanity_challenge"
                  name="humanity_challenge"
                  value={formData.humanity_challenge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Energy">Energy</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Finance">Finance</option>
                  </select>
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
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
                  onChange={(e) => handleArrayInputChange(e, "skills_required")}
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
    </PageLayout>
  );
};

export default SubmitIdea;
