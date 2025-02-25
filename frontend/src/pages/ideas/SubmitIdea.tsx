import React from "react";
import Navigation from "@/components/shared/Navigation";

const SubmitIdea = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Submit Your Idea
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Energy">Energy</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Environment">Environment</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="timeHorizon"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Time Horizon
                </label>
                <select
                  id="timeHorizon"
                  name="timeHorizon"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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

            <div>
              <label
                htmlFor="problemStatement"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Problem Statement
              </label>
              <textarea
                id="problemStatement"
                name="problemStatement"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#ffbd59] text-white rounded-md hover:bg-[#e6aa50] transition-colors"
              >
                Submit Idea
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SubmitIdea;
