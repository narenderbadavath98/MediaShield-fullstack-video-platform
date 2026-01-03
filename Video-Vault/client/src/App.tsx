import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import UploadPage from "@/pages/upload";
import PlayerPage from "@/pages/player";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/upload" component={UploadPage} />
      <Route path="/player/:id" component={PlayerPage} />
      <Route path="/library">
         {/* Alias library to dashboard for mockup */}
         <Redirect to="/dashboard" />
      </Route>
      
      {/* Default redirect to auth */}
      <Route path="/">
        <Redirect to="/auth" />
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;