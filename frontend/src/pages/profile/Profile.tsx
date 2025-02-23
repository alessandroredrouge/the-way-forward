import React from "react";
import PageLayout from "@/components/shared/PageLayout";
import { Settings, Star, MessageSquare, Heart, BookMarked } from "lucide-react";

const MOCK_USER = {
  name: "John Doe",
  email: "john.doe@example.com",
  joinDate: "January 2024",
  interests: ["AI/ML", "Cleantech", "Healthcare"],
  savedIdeas: [
    {
      title: "AI-Powered Personal Shopping Assistant",
      category: "AI/ML",
      date: "2 days ago",
    },
    {
      title: "Healthcare IoT Integration Platform",
      category: "Healthcare",
      date: "1 week ago",
    },
  ],
  comments: [
    {
      idea: "Decentralized Education Platform",
      comment:
        "This could revolutionize how we verify educational credentials.",
      date: "3 days ago",
    },
    {
      idea: "Smart City Waste Management",
      comment:
        "Have you considered integration with existing city infrastructure?",
      date: "1 week ago",
    },
  ],
};

const Profile = () => {
  return (
    <PageLayout>
      <div className="w-full max-w-full">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">
                    {MOCK_USER.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {MOCK_USER.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {MOCK_USER.email}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Member since {MOCK_USER.joinDate}
                  </p>
                </div>
              </div>
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {MOCK_USER.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Saved Ideas */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BookMarked className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Saved Ideas
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {MOCK_USER.savedIdeas.map((idea, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {idea.category} • Saved {idea.date}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Comments */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Recent Comments
              </h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {MOCK_USER.comments.map((comment, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {comment.idea}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    {comment.comment}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Commented {comment.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
