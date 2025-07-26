import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import News from "./pages/News";
import Learn from "./pages/Learn";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Navigation />
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/sentiment" element={
                <ProtectedRoute>
                  <Navigation />
                  <SentimentAnalysis />
                </ProtectedRoute>
              } />
              <Route path="/news" element={
                <ProtectedRoute>
                  <Navigation />
                  <News />
                </ProtectedRoute>
              } />
              <Route path="/learn" element={
                <ProtectedRoute>
                  <Navigation />
                  <Learn />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
