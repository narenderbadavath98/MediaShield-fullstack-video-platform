import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  UploadCloud, 
  PlaySquare, 
  Settings, 
  LogOut, 
  Menu,
  ShieldCheck,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload Video", href: "/upload", icon: UploadCloud },
    { name: "Library", href: "/library", icon: PlaySquare },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg tracking-tight">MediaShield</h1>
          <p className="text-xs text-muted-foreground">Enterprise Secure Stream</p>
        </div>
      </div>

      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group cursor-pointer",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}>
                  <item.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground")} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@enterprise.com</p>
          </div>
        </div>
        <Link href="/auth">
          <Button variant="outline" className="w-full justify-start text-muted-foreground hover:text-foreground" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed inset-y-0 z-50">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 border-r border-sidebar-border">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-xl sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search videos, transcripts, or tags..." 
                className="pl-9 bg-secondary/50 border-transparent focus:bg-background transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button size="sm" className="hidden md:flex" variant="outline">Documentation</Button>
             <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
              <UploadCloud className="h-4 w-4 mr-2" />
              Upload New
             </Button>
          </div>
        </header>

        <div className="flex-1 p-6 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>

        {/* Developer Footer */}
        <footer className="mt-auto py-6 border-t border-border px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 MediaShield. Developed by <span className="text-foreground font-medium">Narender Badavath</span></p>
            <div className="flex items-center gap-6">
              <a href="mailto:badavathnarender98@gmail.com" className="hover:text-primary transition-colors">badavathnarender98@gmail.com</a>
              <a href="https://github.com/narenderbadavath98" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/narender-badavath" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}