import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useDropzone } from "react-dropzone";
import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, FileVideo, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { saveVideo } from "@/lib/mock-data";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov']
    },
    maxSize: 500 * 1024 * 1024, // 500MB
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Process files and create blob URLs
          files.forEach(file => {
            const videoUrl = URL.createObjectURL(file);
            saveVideo({
              id: Math.random().toString(36).substr(2, 9),
              title: file.name.split('.')[0],
              filename: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              uploadDate: new Date().toISOString(),
              status: "completed",
              sensitivity: "safe",
              duration: "00:00",
              videoUrl: videoUrl, // Save the actual local URL
            });
          });

          toast({
            title: "Upload Complete",
            description: "Your video is now being processed for sensitivity.",
          });
          
          setTimeout(() => setLocation("/dashboard"), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Upload Video</h2>
          <p className="text-muted-foreground mt-1">Upload MP4 or MOV files. Max size 500MB.</p>
        </div>

        <Card className="border-2 border-dashed border-border bg-card/30 hover:bg-card/50 transition-colors">
          <CardContent className="p-0">
            <div
              {...getRootProps()}
              className={cn(
                "flex flex-col items-center justify-center p-12 cursor-pointer transition-all min-h-[300px]",
                isDragActive ? "bg-primary/5" : ""
              )}
            >
              <input {...getInputProps()} />
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <UploadCloud className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {isDragActive ? "Drop video here" : "Drag & drop video files"}
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                Click to browse or drag files here.
                <br />
                Supports MP4, MOV.
              </p>
            </div>
          </CardContent>
        </Card>

        {files.length > 0 && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4">
            <h4 className="text-sm font-medium text-muted-foreground">Files to upload</h4>
            <div className="space-y-3">
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card">
                  <div className="h-10 w-10 rounded bg-primary/20 flex items-center justify-center text-primary">
                    <FileVideo className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  {uploading ? (
                    <div className="w-24">
                       <span className="text-xs text-muted-foreground">{progress}%</span>
                    </div>
                  ) : (
                    <Button variant="ghost" size="icon" onClick={() => removeFile(i)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {uploading && (
              <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                    <span className="text-primary font-medium">Uploading...</span>
                    <span className="text-muted-foreground">{progress}%</span>
                 </div>
                 <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button onClick={handleUpload} disabled={uploading || files.length === 0} size="lg" className="w-full sm:w-auto">
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Start Upload
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}