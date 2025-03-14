
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Odyssey from "./pages/Odyssey";
import Arena from "./pages/Arena";
import Tribe from "./pages/Tribe";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { ActivityProvider } from "./contexts/ActivityContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ActivityProvider>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/odyssey" element={<Odyssey />} />
                <Route path="/arena" element={<Arena />} />
                <Route path="/tribe" element={<Tribe />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blog" element={<Tribe />} /> {/* Reusing Tribe component for Blog temporarily */}
              </Routes>
            </main>
            <Footer />
          </ActivityProvider>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
