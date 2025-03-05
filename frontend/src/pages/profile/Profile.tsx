import React from "react";
import UserProfileDisplay from "@/components/UserProfileDisplay";
import PageLayout from "@/components/shared/PageLayout";
import { Settings, Star, MessageSquare, Heart, BookMarked } from "lucide-react";

const Profile = () => {
  return (
    <PageLayout>
      <div className="w-full max-w-full">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <UserProfileDisplay />
          </div>

          <div className="md:col-span-2">
            <div className="grid gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Activity</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Your recent activity will appear here.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Your Ideas</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Ideas you've submitted will appear here.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Your Comments</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Comments you've made will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
