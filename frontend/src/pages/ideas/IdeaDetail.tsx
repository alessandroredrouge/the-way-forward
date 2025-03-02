import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/shared/Navigation";
import {
  ArrowLeft,
  MessageSquare,
  Users,
  Calendar,
  Globe,
  Zap,
  ArrowUp,
  ArrowDown,
  Send,
  Clock,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Idea {
  id: string;
  title: string;
  category: string;
  sub_category: string;
  geographic_focus: string;
  time_horizon: string;
  date_created: string;
  date_updated: string;
  problem_statement: string;
  solution: string;
  why_now: string;
  market_estimate: number;
  business_model: string;
  technologies: string[];
  competition: string;
  status: string;
  type_of_author: string;
  author: string;
  sources: string[];
  humanity_challenge: string;
  ideal_customer_profile?: string;
  skills_required?: string[];
  potential_investors?: string[];
  potential_customers?: string[];
  contacts?: string[];
  collaboration_groups?: string[];
  similar_ideas?: string[];
  supporting_material?: any;
  other?: string;
  upvotes: number;
  downvotes: number;
  view_count: number;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  replies?: Comment[];
}

const IdeaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  // Fetch idea details
  useEffect(() => {
    const fetchIdeaDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8000/api/v1/ideas/${id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch idea: ${response.statusText}`);
        }

        const data = await response.json();
        setIdea(data);

        // TODO: In the future, implement actual comment fetching
        // For now, we'll use mock comments
        setComments([
          {
            id: "1",
            author: "Jane Smith",
            content:
              "This is a brilliant idea! I'd love to collaborate on this.",
            timestamp: "2 days ago",
            upvotes: 12,
            downvotes: 1,
          },
          {
            id: "2",
            author: "John Doe",
            content:
              "Have you considered the regulatory challenges in this space?",
            timestamp: "1 day ago",
            upvotes: 5,
            downvotes: 0,
          },
        ]);
      } catch (err) {
        console.error("Error fetching idea details:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchIdeaDetails();
    }
  }, [id]);

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would send the comment to the backend
    const newCommentObj: Comment = {
      id: `temp-${Date.now()}`,
      author: "Current User", // This would come from auth context
      content: newComment,
      timestamp: "Just now",
      upvotes: 0,
      downvotes: 0,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");

    toast({
      title: "Comment added",
      description: "Your comment has been added successfully.",
    });
  };

  const formatCurrency = (amount: number) => {
    // Convert to millions for display
    const inMillions = amount / 1000000;
    return `$${inMillions.toLocaleString()} Million`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/ideas"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Ideas
            </Link>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-28" />
              </div>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-24 w-full mb-8" />
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-24 w-full mb-8" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/ideas"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Ideas
            </Link>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                Error Loading Idea
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {error || "This idea could not be found or has been removed."}
              </p>
              <Link
                to="/ideas"
                className="px-6 py-2 bg-[#ffbd59] hover:bg-[#e6aa50] text-white rounded-lg transition-colors"
              >
                Return to Ideas
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/ideas"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Ideas
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {idea.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                {idea.humanity_challenge}
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {idea.category}
              </span>
              {idea.sub_category && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                  {idea.sub_category}
                </span>
              )}
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">
                {idea.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <span>{idea.geographic_focus}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {new Date(
                    idea.date_created || idea.date_updated
                  ).toLocaleDateString()}
                </span>
              </div>
              {idea.time_horizon && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{idea.time_horizon}</span>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Problem Statement
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {idea.problem_statement}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Solution
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {idea.solution}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Why Now?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {idea.why_now}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Market & Business
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Market Estimate
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {formatCurrency(idea.market_estimate)}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Business Model
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {idea.business_model}
                  </p>
                </div>
              </div>
            </div>

            {idea.technologies && idea.technologies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {idea.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {idea.competition && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Competition
                </h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {idea.competition}
                </p>
              </div>
            )}

            {idea.ideal_customer_profile && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Ideal Customer Profile
                </h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {idea.ideal_customer_profile}
                </p>
              </div>
            )}

            {idea.skills_required && idea.skills_required.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Skills Required
                </h2>
                <div className="flex flex-wrap gap-2">
                  {idea.skills_required.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {idea.sources && idea.sources.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Sources
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {idea.sources.map((source, index) => (
                    <li key={index} className="mb-1">
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {idea.other && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Additional Information
                </h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {idea.other}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between border-t dark:border-gray-700 pt-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    <ArrowUp className="w-5 h-5" />
                  </button>
                  <span className="text-gray-900 dark:text-gray-100">
                    {idea.upvotes}
                  </span>
                  <button className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                    <ArrowDown className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-100">
                    {comments.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-100">
                    {idea.view_count || 0}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Author:</span> {idea.author}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Discussion
            </h2>

            <div className="mb-8">
              <Textarea
                placeholder="Share your thoughts on this idea..."
                className="min-h-[100px] mb-3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                className="bg-[#ffbd59] hover:bg-[#e6aa50] text-white"
                onClick={handleSubmitComment}
              >
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
            </div>

            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  Be the first to comment on this idea!
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {comment.author}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {comment.timestamp}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <button className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {comment.upvotes}
                        </span>
                        <button className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                        Reply
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Future AI Agent Section - Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mt-8 border-t-4 border-[#ffbd59]">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-[#ffbd59] mr-2">✨</span>
              AI Analysis Assistant
              <span className="ml-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                Coming Soon
              </span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              In the future, you'll be able to ask our AI assistant for deeper
              analysis of this idea, market research, potential improvements,
              and more. Stay tuned!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IdeaDetail;
