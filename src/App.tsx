import JrTest from '@/pages/__JrTest';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import CVCreate from "./pages/CVCreate";
import Gallery from "./pages/Gallery";
import Share from "./pages/Share";
import Auth from "./pages/Auth";
import MyCVs from "./pages/MyCVs";
import CategoryGallery from "./pages/CategoryGallery";
import TemplateDetail from "./pages/TemplateDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create" element={<CVCreate />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:category" element={<CategoryGallery />} />
            <Route path="/gallery/:category/:templateId" element={<TemplateDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/mes-cv" element={<MyCVs />} />
            <Route path="/share/:shareId" element={<Share />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/__jrtest" element={<JrTest />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
