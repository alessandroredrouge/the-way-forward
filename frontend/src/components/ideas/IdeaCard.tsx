import React, { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Users,
  Lock,
  Calendar,
  Globe,
  Zap,
  Clock,
} from "lucide-react";
import IdeaDialog from "@/components/ideas/IdeaDialog";

interface IdeaCardProps {
  // Mandatory Fields
  title: string;
  category: string;
  sub_category: string;
  geographicFocus: string;
  dateCreated: string;
  dateUpdated: string;
  problemStatement: string;
  solution: string;
  whyNow: string;
  marketEstimate: number;
  businessModel: string;
  technologies: string[];
  competition: string;
  status: string;
  typeOfAuthor: string;
  author: string;
  sources: string[];
  timeHorizon: string;
  humanityChallenge: string;

  // Optional Fields
  idealCustomerProfile?: string;
  skillsRequired?: string[];
  potentialInvestors?: string[];
  potentialCustomers?: string[];
  contacts?: string[];
  collaborationGroups?: string[];
  similarIdeas?: string[];
  supportingMaterial?: File[];
  other?: string;

  // Interaction metrics
  votes: number;
  comments: number;
  interestedCount: number;
  timestamp: string;
  isPremium?: boolean;
}

const IdeaCard = (props: IdeaCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Add console logging
  console.log("IdeaCard props:", props);

  const {
    title,
    category,
    humanityChallenge,
    geographicFocus,
    dateCreated,
    problemStatement,
    solution,
    technologies = [],
    author,
    votes,
    comments,
    interestedCount,
    timestamp,
    isPremium = false,
  } = props;

  // Function to truncate text if it's too long
  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <>
      <div
        className="group bg-white dark:bg-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-600 animate-fade-up cursor-pointer w-full h-full flex flex-col"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex items-start justify-between flex-grow">
          <div className="flex-1 min-w-0 overflow-hidden">
            {" "}
            {/* min-width: 0 prevents flex items from growing beyond container */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className="text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded-full inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {truncateText(humanityChallenge, 20)}
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {truncateText(category, 15)}
              </span>
              {isPremium && (
                <Lock className="w-4 h-4 text-secondary flex-shrink-0" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#4c77f6] transition-colors truncate">
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center max-w-[45%] overflow-hidden">
                <Globe className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{geographicFocus}</span>
              </div>
              <div className="flex items-center max-w-[50%] overflow-hidden">
                <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {new Date(dateCreated).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-0.5">
                Problem
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {problemStatement}
              </p>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-0.5">
                Solution
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {solution}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 max-w-full overflow-hidden"
                >
                  <Zap className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{truncateText(tech, 10)}</span>
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{technologies.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center ml-3 space-y-1 flex-shrink-0">
            <button
              className="text-gray-400 dark:text-gray-500 hover:text-secondary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Add upvote logic here
              }}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {votes}
            </span>
            <button
              className="text-gray-400 dark:text-gray-500 hover:text-secondary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Add downvote logic here
              }}
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-600">
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span className="text-xs">{comments}</span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-xs">{interestedCount}</span>
            </div>
          </div>
          <div className="flex flex-col items-end text-xs min-w-0 ml-2">
            <span className="text-gray-500 dark:text-gray-400 truncate max-w-[100px]">
              by {author}
            </span>
            <span className="text-gray-400 dark:text-gray-500 truncate max-w-[100px]">
              {timestamp}
            </span>
          </div>
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
