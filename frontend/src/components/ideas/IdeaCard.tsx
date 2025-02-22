
import React, { useState } from "react";
import { ArrowUp, ArrowDown, MessageSquare, Users, Lock } from "lucide-react";
import IdeaDialog from "./IdeaDialog";

interface IdeaCardProps {
  title: string;
  category: string;
  subcategory: string;
  difficulty: "Easy" | "Moderate" | "Advanced";
  problemStatement: string;
  votes: number;
  comments: number;
  interestedCount: number;
  timestamp: string;
  isPremium?: boolean;
}

const IdeaCard = (props: IdeaCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    title,
    category,
    subcategory,
    difficulty,
    problemStatement,
    votes,
    comments,
    interestedCount,
    timestamp,
    isPremium = false,
  } = props;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div
        className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 animate-fade-up cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {category}
              </span>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {subcategory}
              </span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(
                  difficulty
                )}`}
              >
                {difficulty}
              </span>
              {isPremium && <Lock className="w-4 h-4 text-secondary" />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-secondary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {problemStatement}
            </p>
          </div>
          <div className="flex flex-col items-center ml-4 space-y-1">
            <button
              className="text-gray-400 hover:text-secondary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Add upvote logic here
              }}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-700">{votes}</span>
            <button
              className="text-gray-400 hover:text-secondary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Add downvote logic here
              }}
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span className="text-xs">{comments}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-xs">{interestedCount}</span>
            </div>
          </div>
          <span className="text-xs text-gray-400">{timestamp}</span>
        </div>
      </div>
      <IdeaDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        idea={props}
      />
    </>
  );
};

export default IdeaCard;
