import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import "@/styles/globals.css";

// Import all pages
import Home from "./pages/home/Home";
import IdeasPortal from "./pages/ideas/IdeasPortal";
import IdeaDetail from "./pages/ideas/IdeaDetail";
import SubmitIdea from "./pages/ideas/SubmitIdea";
import KnowledgeHub from "./pages/knowledge hub/KnowledgeHub";
import Podcast from "./pages/podcast/Podcast";
import DeepDives from "./pages/deep-dives/DeepDives";
import Community from "./pages/community/Community";
import Resources from "./pages/resources/Resources";
import Profile from "./pages/profile/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DarkModeProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<Home />} />

              {/* Ideas Routes */}
              <Route path="/ideas" element={<IdeasPortal />} />
              <Route path="/ideas/:id" element={<IdeaDetail />} />
              <Route path="/ideas/submit" element={<SubmitIdea />} />

              {/* Knowledge Hub Routes */}
              <Route path="/knowledge-hub" element={<KnowledgeHub />} />
              <Route path="/podcast" element={<Podcast />} />
              <Route path="/deep-dives" element={<DeepDives />} />
              <Route path="/resources" element={<Resources />} />

              {/* Other Routes */}
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />

              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </DarkModeProvider>
  </QueryClientProvider>
);

export default App;
