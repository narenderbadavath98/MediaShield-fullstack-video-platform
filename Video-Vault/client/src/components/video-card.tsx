import { Link } from "wouter";
import { Play, Clock, FileVideo, MoreVertical, ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { VideoItem } from "@/lib/mock-data";

interface VideoCardProps {
  video: VideoItem;
}

export default function VideoCard({ video }: VideoCardProps) {
  const isProcessing = video.status === "processing";
  
  return (
    <Card className="overflow-hidden group hover:border-primary/50 transition-colors duration-300 bg-card/50 backdrop-blur-sm">
      <div className="aspect-video relative bg-muted flex items-center justify-center overflow-hidden">
        {video.thumbnail ? (
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            {isProcessing ? (
               <Loader2 className="h-8 w-8 animate-spin text-primary" />
            ) : (
               <FileVideo className="h-10 w-10 opacity-20" />
            )}
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          {!isProcessing && (
            <Link href={`/player/${video.id}`}>
              <Button size="icon" className="rounded-full h-12 w-12 bg-primary text-primary-foreground hover:scale-110 transition-transform">
                <Play className="h-5 w-5 ml-1" />
              </Button>
            </Link>
          )}
        </div>

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded font-mono">
            {video.duration}
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-2 left-2">
           {video.sensitivity === "safe" && (
             <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 backdrop-blur-md">
               <ShieldCheck className="h-3 w-3 mr-1" /> Safe
             </Badge>
           )}
           {video.sensitivity === "flagged" && (
             <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20 backdrop-blur-md">
               <ShieldAlert className="h-3 w-3 mr-1" /> Flagged
             </Badge>
           )}
           {video.sensitivity === "analyzing" && (
             <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-md animate-pulse">
               Analyzing
             </Badge>
           )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1 w-full">
            <h3 className="font-medium leading-none truncate pr-4" title={video.title}>{video.title}</h3>
            <div className="flex items-center text-xs text-muted-foreground gap-2">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(video.uploadDate).toLocaleDateString()}
              </span>
              <span>•</span>
              <span>{video.size}</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isProcessing && video.progress !== undefined && (
          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Processing...</span>
              <span>{video.progress}%</span>
            </div>
            <Progress value={video.progress} className="h-1.5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}