import React, { useState, useEffect } from "react";
import VideoCard from "../../../../components/card/VideoCard";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const videoIds = [
  "aMWT9aEShWs",
  "OW0uuGfpvUE",
  "B6kryr_WIaY",
  "cWmGqByYEus",
  "SUt8q0EKbms",
  "7HUW_aukApo",
  "e_04ZrNroTo",
  "XqZsoesa55w",
  "kpy6QEAuLJw",
  "cSe5mwiXPT0",
  "O9S70oJAivI",
  "d0wV9EC3t14",
];

const ExtraVideo = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(
          ","
        )}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

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
  }, []);

  return (
    <div className="mt-[88px] sm:ml-64">
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 xl:p-4 lg:p-4 md:p-4 sm:p-4 py-4 px-16">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
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
          : videos.map((video) => <VideoCard key={video.id} video={video} />)}
      </div>
    </div>
  );
};

export default ExtraVideo;
