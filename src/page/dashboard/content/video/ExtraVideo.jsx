import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import VideoCard from "../../../../components/card/VideoCard";
import Pagination from "../../../user/Pagination";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const ExtraVideo = () => {
  const videoIds = useSelector((state) => state.videos.videoIds); // Access videoIds from Redux state
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (videoIds.length === 0) {
      console.error("No video IDs available.");
      return;
    }

    const fetchVideos = async () => {
      try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(
          ","
        )}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
          setVideos(data.items);
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [videoIds]);

  // Get current page videos
  const indexOfLastVideo = currentPage * itemsPerPage;
  const indexOfFirstVideo = indexOfLastVideo - itemsPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-[88px] sm:ml-64">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg overflow-hidden animate-pulse"
            >
              <div className="bg-gray-300 w-full h-52"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/4"></div>
              </div>
            </div>
          ))
        ) : currentVideos.length === 0 ? (
          <p>No videos found.</p>
        ) : (
          currentVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))
        )}
      </div>

      {/* Pagination Component */}
      <Pagination
        totalItems={videos.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default ExtraVideo;
