import React, { useState } from "react";
import { Search, Filter, Trophy, Users, MessageSquare } from "lucide-react";
import PageLayout from "@/components/shared/PageLayout";

interface User {
  id: string;
  name: string;
  avatar: string;
  interests: string[];
  skills: string[];
  location: string;
}

interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prize: string;
  participants: number;
}

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<
    "people" | "competitions" | "discussions"
  >("people");

  // Mock data - In a real app, this would come from an API
  const mockUsers: User[] = [
    {
      id: "1",
      name: "Alex Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      interests: ["AI", "Climate Tech", "Renewable Energy"],
      skills: ["Python", "Machine Learning", "Data Analysis"],
      location: "London, UK",
    },
    {
      id: "2",
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      interests: ["Sustainability", "Urban Planning", "Smart Cities"],
      skills: ["React", "TypeScript", "UI/UX Design"],
      location: "Singapore",
    },
  ];

  const mockCompetitions: Competition[] = [
    {
      id: "1",
      title: "Climate Tech Innovation Challenge",
      description:
        "Build innovative solutions to combat climate change using AI and IoT",
      startDate: "2024-04-01",
      endDate: "2024-05-15",
      prize: "$10,000",
      participants: 156,
    },
    {
      id: "2",
      title: "Sustainable Cities Hackathon",
      description:
        "Design and prototype solutions for smart, sustainable urban living",
      startDate: "2024-05-01",
      endDate: "2024-06-01",
      prize: "$5,000",
      participants: 89,
    },
  ];

  const UserCard = ({ user }: { user: User }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.location}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Interests
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {user.interests.map((interest) => (
            <span
              key={interest}
              className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Skills
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {user.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <button className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
        Connect
      </button>
    </div>
  );

  const CompetitionCard = ({ competition }: { competition: Competition }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {competition.title}
        </h3>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {competition.description}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
          <p className="font-medium">
            {new Date(competition.startDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">End Date</p>
          <p className="font-medium">
            {new Date(competition.endDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Prize</p>
          <p className="font-medium text-green-600 dark:text-green-400">
            {competition.prize}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Participants
          </p>
          <p className="font-medium">{competition.participants}</p>
        </div>
      </div>
      <button className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
        Join Competition
      </button>
    </div>
  );

  return (
    <PageLayout>
      <div className="w-full max-w-full">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Community
            </h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search people, competitions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="p-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
            <button
              className={`py-2 px-4 whitespace-nowrap ${
                activeTab === "people"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("people")}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>People</span>
              </div>
            </button>
            <button
              className={`py-2 px-4 whitespace-nowrap ${
                activeTab === "competitions"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("competitions")}
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span>Competitions</span>
              </div>
            </button>
            <button
              className={`py-2 px-4 whitespace-nowrap ${
                activeTab === "discussions"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("discussions")}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>Discussions</span>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activeTab === "people" &&
              mockUsers.map((user) => <UserCard key={user.id} user={user} />)}
            {activeTab === "competitions" &&
              mockCompetitions.map((competition) => (
                <CompetitionCard
                  key={competition.id}
                  competition={competition}
                />
              ))}
            {activeTab === "discussions" && (
              <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
                Discussions feature coming soon!
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Community;
