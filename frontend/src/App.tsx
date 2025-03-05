import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "@/styles/globals.css";

// Import all pages
import Home from "./pages/home/Home";
import IdeasPortal from "./pages/ideas/IdeasPortal";
import IdeaDetail from "./pages/ideas/IdeaDetail";
import SubmitIdea from "./pages/ideas/SubmitIdea";
import KnowledgeHub from "./pages/knowledge hub/KnowledgeHub";
import Challenges from "./pages/challenges/Challenges";
import Podcast from "./pages/podcast/Podcast";
import DeepDives from "./pages/deep-dives/DeepDives";
import Community from "./pages/community/Community";
import Resources from "./pages/resources/Resources";
import Profile from "./pages/profile/Profile";
import Auth from "./pages/auth/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DarkModeProvider>
      <AuthProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Home Route */}
                <Route path="/" element={<Home />} />

                {/* Auth Route */}
                <Route path="/auth" element={<Auth />} />

                {/* Ideas & Challenges Routes */}
                <Route path="/ideas" element={<IdeasPortal />} />
                <Route
                  path="/ideas/submit"
                  element={
                    <ProtectedRoute>
                      <SubmitIdea />
                    </ProtectedRoute>
                  }
                />
                <Route path="/ideas/:id" element={<IdeaDetail />} />
                <Route path="/challenges" element={<Challenges />} />

                {/* Knowledge Hub Routes */}
                <Route path="/knowledge-hub" element={<KnowledgeHub />} />
                <Route path="/podcast" element={<Podcast />} />
                <Route path="/deep-dives" element={<DeepDives />} />
                <Route path="/resources" element={<Resources />} />

                {/* Protected Routes */}
                <Route
                  path="/community"
                  element={
                    <ProtectedRoute>
                      <Community />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </DarkModeProvider>
  </QueryClientProvider>
);

export default App;
