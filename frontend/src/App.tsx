import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeContext";

// Import new components
import Home from "./pages/home/Home";
import IdeasPortal from "./pages/ideas/IdeasPortal";
import IdeaDetail from "./pages/ideas/IdeaDetail";
import SubmitIdea from "./pages/ideas/SubmitIdea";
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

              {/* Other Routes (to be implemented) */}
              <Route path="/podcast" element={<NotFound />} />
              <Route path="/deep-dives" element={<NotFound />} />
              <Route path="/resources" element={<NotFound />} />
              <Route path="/profile" element={<NotFound />} />

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
