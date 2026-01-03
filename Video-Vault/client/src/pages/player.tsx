import { useParams, Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getVideos } from "@/lib/mock-data";
import { ArrowLeft, Download, Share2, Flag, ShieldCheck, ShieldAlert } from "lucide-react";

export default function PlayerPage() {
  const { id } = useParams();
  const videos = getVideos();
  const video = videos.find(v => v.id === id) || videos[0];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <Link href="/dashboard">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Video Player Container */}
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-border/50 group">
          <video 
            key={video.id} // Important: Force re-render on video change
            className="w-full h-full"
            poster={video.thumbnail}
            controls
            autoPlay
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
             <div className="flex items-start justify-between">
                <div>
                   <h1 className="text-2xl font-display font-bold">{video.title}</h1>
                   <p className="text-muted-foreground mt-1">Uploaded on {new Date(video.uploadDate).toLocaleDateString()}</p>
                </div>
             </div>

             <div className="flex items-center gap-3 pt-2">
               {video.sensitivity === "safe" ? (
                 <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1">
                   <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                   Safe Content
                 </Badge>
               ) : (
                 <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20 px-3 py-1">
                   <ShieldAlert className="mr-1.5 h-3.5 w-3.5" />
                   Flagged Content
                 </Badge>
               )}
               <Badge variant="outline" className="text-muted-foreground">
                 {video.size}
               </Badge>
               <Badge variant="outline" className="text-muted-foreground">
                 {video.duration}
               </Badge>
             </div>

             <div className="prose dark:prose-invert max-w-none pt-4 text-sm text-muted-foreground">
               <p>
                 This video has been processed by our sensitivity analysis engine. 
                 The content is securely stored and encrypted. 
                 Use the controls to manage access permissions or download the original file.
               </p>
             </div>
          </div>

          <div className="space-y-4">
             <Button className="w-full" variant="outline">
               <Download className="mr-2 h-4 w-4" />
               Download Original
             </Button>
             <Button className="w-full" variant="outline">
               <Share2 className="mr-2 h-4 w-4" />
               Share Secure Link
             </Button>
             <Button className="w-full text-destructive hover:text-destructive hover:bg-destructive/10" variant="ghost">
               <Flag className="mr-2 h-4 w-4" />
               Report Issue
             </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}