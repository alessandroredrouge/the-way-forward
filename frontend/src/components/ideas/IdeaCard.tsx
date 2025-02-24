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
} from "lucide-react";
import IdeaDialog from "@/components/ideas/IdeaDialog";

interface IdeaCardProps {
  // Mandatory Fields
  title: string;
  category: string;
  subcategory: string;
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
    subcategory,
    geographicFocus,
    dateCreated,
    problemStatement,
    solution,
    technologies = [],
    status = "early-stage",
    author,
    votes,
    comments,
    interestedCount,
    timestamp,
    isPremium = false,
  } = props;

  // Add more logging
  console.log("Status after destructuring:", status);

  const getStatusColor = (status: string = "early-stage") => {
    // Log the status being passed to getStatusColor
    console.log("getStatusColor received:", status);

    // Ensure we have a string to work with
    const normalizedStatus = (status || "early-stage").toLowerCase();

    switch (normalizedStatus) {
      case "early-stage":
        return "bg-blue-100 text-blue-800";
      case "proven":
        return "bg-green-100 text-green-800";
      case "pilot":
        return "bg-yellow-100 text-yellow-800";
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
                className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                  status
                )}`}
              >
                {status}
              </span>
              {isPremium && <Lock className="w-4 h-4 text-secondary" />}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-secondary transition-colors">
              {title}
            </h3>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Globe className="w-3 h-3" />
              <span>{geographicFocus}</span>
              <Calendar className="w-3 h-3 ml-2" />
              <span>{new Date(dateCreated).toLocaleDateString()}</span>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-600 font-medium mb-1">Problem</p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {problemStatement}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 font-medium mb-1">Solution</p>
              <p className="text-sm text-gray-600 line-clamp-2">{solution}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-600"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{technologies.length - 3} more
                </span>
              )}
            </div>
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
          <div className="flex flex-col items-end text-xs">
            <span className="text-gray-500">by {author}</span>
            <span className="text-gray-400">{timestamp}</span>
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
