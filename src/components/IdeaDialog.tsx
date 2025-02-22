
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowUp, ArrowDown, MessageSquare, Users, Lock } from "lucide-react";

interface IdeaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  idea: {
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
  };
}

const IdeaDialog = ({ isOpen, onClose, idea }: IdeaDialogProps) => {
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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-h-[85vh] w-[90vw] max-w-[800px] rounded-xl bg-white p-6 shadow-lg animate-fade-up overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {idea.category}
              </span>
              <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {idea.subcategory}
              </span>
              <span
                className={`text-sm font-medium px-2 py-1 rounded-full ${getDifficultyColor(
                  idea.difficulty
                )}`}
              >
                {idea.difficulty}
              </span>
              {idea.isPremium && <Lock className="w-5 h-5 text-secondary" />}
            </div>
            <Dialog.Close className="text-gray-400 hover:text-gray-900">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">{idea.title}</h2>
          
          <div className="prose prose-sm max-w-none text-gray-600 mb-6">
            <p>{idea.problemStatement}</p>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-secondary transition-colors">
                  <ArrowUp className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-gray-700">
                  {idea.votes}
                </span>
                <button className="text-gray-400 hover:text-secondary transition-colors">
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center text-gray-500">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span className="text-sm">{idea.comments}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">{idea.interestedCount}</span>
              </div>
            </div>
            <span className="text-sm text-gray-400">{idea.timestamp}</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default IdeaDialog;
