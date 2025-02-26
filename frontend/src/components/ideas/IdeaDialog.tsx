import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Users,
  Lock,
  Calendar,
  Globe,
  Zap,
} from "lucide-react";

interface IdeaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  idea: {
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
    votes: number;
    comments: number;
    interestedCount: number;
    timestamp: string;
    isPremium?: boolean;
  };
}

const IdeaDialog = ({ isOpen, onClose, idea }: IdeaDialogProps) => {
  const getStatusColor = (status: string = "early-stage") => {
    const normalizedStatus = (status || "early-stage").toLowerCase();

    switch (normalizedStatus) {
      case "early-stage":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "proven":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pilot":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    // Convert to millions for display
    const inMillions = amount / 1000000;
    return `$${inMillions.toLocaleString()} Million`;
  };

  // Function to truncate text if it's too long
  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content className="fixed left-[50%] top-[55%] translate-x-[-50%] translate-y-[-50%] max-h-[80vh] w-[90vw] max-w-[800px] rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-xl animate-fade-up overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-wrap items-center gap-2 max-w-[85%]">
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {idea.humanityChallenge}
              </span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {idea.category}
              </span>
              {idea.isPremium && (
                <Lock className="w-5 h-5 text-secondary flex-shrink-0" />
              )}
            </div>
            <Dialog.Close className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex-shrink-0">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 break-words">
            {idea.title}
          </h2>

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="break-words">{idea.geographicFocus}</span>
            </div>
            <div className="flex items-center ml-2">
              <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>{new Date(idea.dateCreated).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-5">
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Problem
              </h3>
              <p className="text-gray-600 dark:text-gray-300 break-words">
                {idea.problemStatement}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Solution
              </h3>
              <p className="text-gray-600 dark:text-gray-300 break-words">
                {idea.solution}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Why Now?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 break-words">
                {idea.whyNow}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Market & Business
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Market Estimate:</span>{" "}
                  {formatCurrency(idea.marketEstimate)}
                </p>
                <p className="text-gray-600 dark:text-gray-300 break-words">
                  <span className="font-medium">Business Model:</span>{" "}
                  {idea.businessModel}
                </p>
                <p className="text-gray-600 dark:text-gray-300 break-words">
                  <span className="font-medium">Competition:</span>{" "}
                  {idea.competition}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Time Horizon:</span>{" "}
                  {idea.timeHorizon}
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {idea.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm max-w-full overflow-hidden"
                  >
                    <Zap className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{tech}</span>
                  </span>
                ))}
              </div>
            </section>

            {idea.sources.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Sources
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {idea.sources.map((source, index) => (
                    <li key={index} className="break-words overflow-hidden">
                      {source}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-6 mb-2 sm:mb-0">
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 dark:text-gray-500 hover:text-secondary dark:hover:text-secondary transition-colors">
                  <ArrowUp className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {idea.votes}
                </span>
                <button className="text-gray-400 dark:text-gray-500 hover:text-secondary dark:hover:text-secondary transition-colors">
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span className="text-sm">{idea.comments}</span>
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">{idea.interestedCount}</span>
              </div>
            </div>
            <div className="flex flex-col items-end text-sm">
              <span className="text-gray-600 dark:text-gray-300 break-words">
                by {idea.author}
              </span>
              <span className="text-gray-400 dark:text-gray-500">
                {idea.timestamp}
              </span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default IdeaDialog;
