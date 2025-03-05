import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserProfileDisplayProps {
  minimal?: boolean;
}

const UserProfileDisplay = ({ minimal = false }: UserProfileDisplayProps) => {
  const { user } = useAuth();
  const { profile, loading, error, refreshProfile } = useUserProfile(user);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
        <span>Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 my-4">
        <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
          Error loading profile
        </h3>
        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={refreshProfile}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 my-4">
        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
          Profile not found
        </h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-400">
          Your profile information could not be loaded.
        </p>
      </div>
    );
  }

  if (minimal) {
    return (
      <div className="p-3 border rounded-md">
        <p className="font-medium">{profile.full_name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          @{profile.username}
        </p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold">{profile.full_name}</h3>
            <p className="text-gray-500 dark:text-gray-400">
              @{profile.username}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </h4>
              <p>{user?.email}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Member Since
              </h4>
              <p>{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                User Type
              </h4>
              <p>{profile.type_of_user}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Credits
              </h4>
              <p>{profile.credits}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileDisplay;
