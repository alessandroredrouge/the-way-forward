import React from "react";
import PageLayout from "@/components/shared/PageLayout";
import { ExternalLink, Play } from "lucide-react";

const MOCK_EPISODES = [
  {
    title:
      "Climatetech with Ale #1: Pascal Kuhn - Future of BESS, EPC Companies, Energy Regulation in Europe",
    host: "Alessandro Mendini",
    guest: "Pascal Kuhn",
    description:
      "Deep dive into Battery Energy Storage Systems (BESS), the role of EPC companies in the energy transition, and the evolving landscape of energy regulation in Europe.",
    duration: "25 min",
    date: "Mar 15, 2024",
    spotifyLink: "#",
    youtubeLink: "#",
    relatedIdeas: ["Energy Storage Solutions", "Regulatory Tech Platform"],
    category: "Climatetech",
  },
  {
    title:
      "Automotive with Sam #3: Leonardo Scalpi - CEO Ferrari Talks About F1, New Ways of Modelling Fluid Dynamics, EVs",
    host: "Sam Carter",
    guest: "Leonardo Scalpi",
    description:
      "Exploring the intersection of Formula 1 technology, computational fluid dynamics innovations, and the future of electric vehicles.",
    duration: "30 min",
    date: "Mar 10, 2024",
    spotifyLink: "#",
    youtubeLink: "#",
    relatedIdeas: [
      "EV Performance Optimization",
      "Aerodynamics Simulation Platform",
    ],
    category: "Automotive",
  },
  {
    title: "AI/ML with Sarah #2: Deep Learning Applications in Healthcare",
    host: "Sarah Johnson",
    guest: "Dr. Emily Chen",
    description:
      "Exploring the latest applications of deep learning in healthcare, from diagnostic tools to personalized treatment plans.",
    duration: "28 min",
    date: "Mar 5, 2024",
    spotifyLink: "#",
    youtubeLink: "#",
    relatedIdeas: ["AI Diagnostic Assistant", "Healthcare Data Platform"],
    category: "AI/ML",
  },
];

const Podcast = () => {
  return (
    <PageLayout>
      <div className="w-full max-w-full">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            The Way Forward Podcast
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Industry experts discuss challenges and opportunities in their
            sectors, sharing insights and exploring potential solutions.
          </p>
        </div>

        {/* Episodes List */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {MOCK_EPISODES.map((episode, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                    <Play className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                </div>
                <div className="flex-grow w-full sm:w-auto">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      {episode.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {episode.duration}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {episode.date}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {episode.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {episode.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Host: {episode.host} • Guest: {episode.guest}
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={episode.spotifyLink}
                        className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Spotify
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={episode.youtubeLink}
                        className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        YouTube
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Podcast;
