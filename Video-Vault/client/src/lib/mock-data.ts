import { Video } from "lucide-react";

export type VideoStatus = "processing" | "completed" | "failed";
export type SensitivityStatus = "safe" | "flagged" | "analyzing";

export interface VideoItem {
  id: string;
  title: string;
  filename: string;
  size: string;
  uploadDate: string;
  status: VideoStatus;
  sensitivity: SensitivityStatus;
  duration: string;
  thumbnail?: string;
  progress?: number;
  videoUrl?: string; // Local URL for uploaded videos
}

const STORAGE_KEY = 'video_vault_mock_data';

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Product Demo 2024",
    filename: "demo_final_v2.mp4",
    size: "124 MB",
    uploadDate: "2024-03-15T10:30:00Z",
    status: "completed",
    sensitivity: "safe",
    duration: "02:14",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "v2",
    title: "User Interview #42",
    filename: "interview_42_raw.mov",
    size: "450 MB",
    uploadDate: "2024-03-14T15:45:00Z",
    status: "processing",
    sensitivity: "analyzing",
    duration: "15:30",
    progress: 45,
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  }
];

export const getVideos = (): VideoItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VIDEOS));
    return DEFAULT_VIDEOS;
  }
  return JSON.parse(stored);
};

export const saveVideo = (video: VideoItem) => {
  const videos = getVideos();
  const updated = [video, ...videos];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const MOCK_VIDEOS = getVideos();
