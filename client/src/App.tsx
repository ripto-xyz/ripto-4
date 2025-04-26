import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import { useEffect } from "react";

function Router() {
  return <Home />;
}

function App() {
  // Force the background color to be the desired deep purple
  useEffect(() => {
    document.body.style.backgroundColor = "#120738";
    document.documentElement.style.backgroundColor = "#120738";
    
    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div style={{ backgroundColor: "#120738", minHeight: "100vh" }}>
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
