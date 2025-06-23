
import { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';

interface Video {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
}

interface VideoGridProps {
  activeTab: string;
}

const VideoGrid = ({ activeTab }: VideoGridProps) => {
  const [videos] = useState<Video[]>([
    {
      id: '1095495803',
      title: '10th Maths Part 1',
      category: 'Mathematics',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      duration: '45:30'
    },
    {
      id: '1095510347',
      title: 'Operating a Computer - Class 2',
      category: 'Computer Science',
      thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      duration: '32:15'
    },
    {
      id: '1095495803',
      title: 'Physics - Motion and Force',
      category: 'Physics',
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop',
      duration: '38:20'
    },
    {
      id: '1095510347',
      title: 'Chemistry Basics',
      category: 'Science',
      thumbnail: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=400&h=300&fit=crop',
      duration: '42:10'
    },
    {
      id: '1095495803',
      title: 'Indian History',
      category: 'Social',
      thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
      duration: '50:45'
    },
    {
      id: '1095510347',
      title: 'Advanced Mathematics',
      category: 'Mathematics',
      thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop',
      duration: '55:30'
    }
  ]);

  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  const filteredVideos = activeTab === 'All' 
    ? videos 
    : videos.filter(video => video.category === activeTab);

  const handleVideoPlay = (videoId: string) => {
    setCurrentPlayingId(videoId);
  };

  const handleVideoStop = () => {
    setCurrentPlayingId(null);
  };

  // Stop video when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (currentPlayingId) {
        setCurrentPlayingId(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPlayingId]);

  return (
    <div className="px-4 py-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {activeTab === 'All' ? 'All Videos' : activeTab}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => (
          <div key={`${video.id}-${video.title}`} className="bg-white rounded-lg shadow-md overflow-hidden">
            <VideoPlayer
              videoId={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              duration={video.duration}
              isPlaying={currentPlayingId === `${video.id}-${video.title}`}
              onPlay={() => handleVideoPlay(`${video.id}-${video.title}`)}
              onStop={handleVideoStop}
            />
            <div className="p-3">
              <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500">{video.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
