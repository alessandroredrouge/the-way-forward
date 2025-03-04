import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const UserProfileCard: React.FC = () => {
  const { authState, signOut, isCurator } = useAuth();
  const { profile } = authState;

  if (!profile) {
    return null;
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name}`}
            alt={profile.full_name}
          />
          <AvatarFallback>{getInitials(profile.full_name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{profile.full_name}</CardTitle>
          <CardDescription>{profile.email}</CardDescription>
          <div className="mt-1">
            <Badge variant={isCurator() ? "default" : "outline"}>
              {profile.type_of_user}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Credits
            </span>
            <span className="text-xl font-semibold">{profile.credits}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Member Since
            </span>
            <span className="text-sm">
              {new Date(profile.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={signOut}>
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfileCard;
