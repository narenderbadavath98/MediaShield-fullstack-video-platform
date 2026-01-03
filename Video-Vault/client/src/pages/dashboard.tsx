import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import VideoCard from "@/components/video-card";
import { getVideos, VideoItem } from "@/lib/mock-data";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, RefreshCcw } from "lucide-react";

export default function Dashboard() {
  const [filter, setFilter] = useState("all");
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    setVideos(getVideos());
  }, []);

  const refreshVideos = () => {
    setVideos(getVideos());
  };

  // Filter logic
  const filteredVideos = videos.filter(v => {
    if (filter === "all") return true;
    if (filter === "safe") return v.sensitivity === "safe";
    if (filter === "flagged") return v.sensitivity === "flagged";
    if (filter === "processing") return v.status === "processing";
    return true;
  });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground mt-1">Manage and monitor your video assets.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] bg-background">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Videos</SelectItem>
                <SelectItem value="safe">Safe Content</SelectItem>
                <SelectItem value="flagged">Flagged Content</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={refreshVideos}>
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Videos", value: videos.length.toString(), trend: "+2 this week" },
            { label: "Storage Used", value: "4.2 GB", trend: "15% of quota" },
            { label: "Processing", value: videos.filter(v => v.status === "processing").length.toString(), trend: "Active jobs" },
            { label: "Flagged", value: videos.filter(v => v.sensitivity === "flagged").length.toString(), trend: "Requires review" },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-xs text-muted-foreground/70">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-20 border border-dashed border-border rounded-xl">
             <p className="text-muted-foreground">No videos found matching your filter.</p>
             <Button variant="link" onClick={() => setFilter("all")}>Clear filters</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}