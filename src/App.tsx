import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import News from "./pages/News";
import Learn from "./pages/Learn";
import NotFound from "./pages/NotFound";
<<<<<<< HEAD
import StockList from "./pages/StockList";
import StockDetails from "./pages/StockDetails";
=======
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sentiment" element={<SentimentAnalysis />} />
            <Route path="/news" element={<News />} />
            <Route path="/learn" element={<Learn />} />
<<<<<<< HEAD
            <Route path="/stocks" element={<StockList />} />
            <Route path="/stocks/:slug" element={<StockDetails />} />
=======
>>>>>>> 252ae00adbd361bac7c91a3cc19485b7c15f3412
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
