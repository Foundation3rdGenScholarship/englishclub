import React, { useEffect, useState } from "react";

const VideoCard = ({ video }) => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [profileImage, setProfileImage] = useState(""); // Store profile image URL
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!video.snippet.channelId) return;

    const fetchChannelImage = async () => {
      try {
        const channelProfileUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${video.snippet.channelId}&key=${API_KEY}`;
        const response = await fetch(channelProfileUrl);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setProfileImage(data.items[0].snippet.thumbnails.default.url); // or .high.url
        }
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannelImage();
  }, [video.snippet.channelId, API_KEY]); // Fetch only when channelId changes

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle click outside to close modal
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showModal && e.target.classList.contains("modal-overlay")) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      <div
        className="rounded-tl-[50px] rounded-br-[50px] bg-white/10 backdrop-blur-md border-2 border-white dark:border-none border-white/20 w-full dark: p-3 rounded-lg bg-white cursor-pointer"
        onClick={toggleModal}
      >
        {/* Video Thumbnail */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <img
            src={
              video.snippet.thumbnails.high?.url ||
              video.snippet.thumbnails.default?.url
            }
            alt={video.snippet.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 5v10l8-5-8-5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Video Details */}
        <div className="flex mt-5">
          {/* Channel Profile Image */}
          <img
            src={profileImage || "/default-avatar.png"} // Fallback image
            alt={video.snippet.channelTitle}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />

          {/* Video Info */}
          <div>
            <h3 className="dark:text-text-des-dark-mode text-text-des-light-mode font-semibold text-sm line-clamp-2">
              {video.snippet.title}
            </h3>
            <p className="text-gray-400 text-xs mt-2">
              {video.snippet.channelTitle}
            </p>
            <p className="text-gray-500 text-xs py-2">
              {Number(video.statistics?.viewCount || 0).toLocaleString()} views
              •{" "}
              {video.snippet.publishedAt
                ? new Date(video.snippet.publishedAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 modal-overlay">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white truncate text-text-des-light-mode">
                {video.snippet.title}
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="relative w-full aspect-video rounded-lg overflow-hidden flex-shrink-0">
              <iframe
                src={`https://www.youtube.com/embed/${
                  video.id?.videoId || video.id
                }?autoplay=1`}
                title={video.snippet.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-4 flex items-start overflow-y-auto pr-2">
              <img
                src={profileImage || "/default-avatar.png"}
                alt={video.snippet.channelTitle}
                className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
              />
              <div className="overflow-y-auto">
                <p className="font-medium dark:text-white text-text-des-light-mode">
                  {video.snippet.channelTitle}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {Number(video.statistics?.viewCount || 0).toLocaleString()}{" "}
                  views •{" "}
                  {video.snippet.publishedAt
                    ? new Date(video.snippet.publishedAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <div className="text-gray-600 dark:text-gray-300 text-sm mt-3 overflow-y-auto max-h-[20vh]">
                  {video.snippet.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;
