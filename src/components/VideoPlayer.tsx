
import { useState, useEffect } from 'react';
import { Play, Pause, Maximize } from 'lucide-react';
import { Slider } from './ui/slider';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  thumbnail: string;
  duration: string;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}

const VideoPlayer = ({ 
  videoId, 
  title, 
  thumbnail, 
  duration, 
  isPlaying, 
  onPlay, 
  onStop 
}: VideoPlayerProps) => {
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(100);

  // Vimeo video URLs mapping
  const vimeoUrls: { [key: string]: string } = {
    '1095495803': 'https://player.vimeo.com/video/1095495803?h=55eac0fa5a&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1',
    
  };

  // Simulate video progress (in real implementation, you'd get this from Vimeo API)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= videoDuration) {
            onStop();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, videoDuration, onStop]);

  const handlePlayPause = () => {
    if (isPlaying) {
      onStop();
    } else {
      onPlay();
    }
  };

  const handleVideoClick = () => {
    setShowControls(!showControls);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const videoContainer = e.currentTarget.closest('.relative.aspect-video') as HTMLElement;
    if (videoContainer) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainer.requestFullscreen().catch(err => {
          console.error('Error attempting to enable fullscreen:', err);
        });
      }
    }
  };

  const handleTimelineChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    // In a real implementation, you would seek the video to this time
    console.log(`Seeking to ${newTime} seconds`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full bg-black rounded-t-lg overflow-hidden">
      <div className="relative aspect-video">
        {isPlaying ? (
          <div className="w-full h-full relative">
            <iframe
              src={vimeoUrls[videoId] || vimeoUrls['1095495803']}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              title={title}
            />
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent"
              onClick={handlePlayPause}
            >
              <button className="bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all opacity-0 hover:opacity-100">
                <Pause size={20} className="text-white" />
              </button>
            </div>
            <div className="absolute top-2 right-2">
              <button
                onClick={handleFullscreen}
                className="bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all opacity-70 hover:opacity-100"
              >
                <Maximize size={16} className="text-white" />
              </button>
            </div>
            {/* Timeline Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-3 text-white text-xs">
                <span>{formatTime(currentTime)}</span>
                <div className="flex-1">
                  <Slider
                    value={[currentTime]}
                    onValueChange={handleTimelineChange}
                    max={videoDuration}
                    step={1}
                    className="w-full"
                  />
                </div>
                <span>{formatTime(videoDuration)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="relative w-full h-full cursor-pointer"
            onClick={handleVideoClick}
          >
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                className="bg-white/90 hover:bg-white rounded-full p-4 transition-all transform hover:scale-110"
              >
                <Play size={24} className="text-gray-800 ml-1" />
              </button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {duration}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
