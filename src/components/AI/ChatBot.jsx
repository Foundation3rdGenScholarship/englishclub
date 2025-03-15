import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoSend } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FaRobot } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { BeatLoader } from "react-spinners"; // For loading spinner

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatBot = ({ isBackToTopVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for AI response
  const chatRef = useRef(null);
  const { t } = useTranslation("chatbot");

  // Scroll to the bottom of the chat when messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      setIsLoading(true); // Start loading
      const result = await model.generateContent(input);
      const aiResponse = await result.response.text();

      // Add AI response to the chat
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      // Handle errors
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: t("sorry! I couldn't process that.") },
      ]);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="fixed right-5 flex flex-col items-end z-50 ">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`w-96 bg-white shadow-lg rounded-lg p-4 mb-2 dark:bg-gray-800 fixed right-5 ${
            isBackToTopVisible ? "bottom-32" : "bottom-16"
          }`}
        >
          {/* Chat Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("chat with AI")}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 dark:text-gray-400"
              aria-label="Close chat"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatRef}
            className="h-80 overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-100 dark:scrollbar-track-gray-700"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-md max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-primary-500 text-white"
                      : "bg-primary-100 dark:text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading Spinner */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-2 rounded-md">
                  <BeatLoader size={8} color="#fba518" />
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex items-center border-t pt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500"
              placeholder={t("ask something...")}
              aria-label="Type your message"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-primary-500 text-white p-2.5 rounded-md hover:bg-primary-600 transition-all duration-300"
              aria-label="Send message"
            >
              <IoSend className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-5 bg-primary-500 p-1 rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 ${
          isBackToTopVisible ? "bottom-20" : "bottom-5"
        }`}
        aria-label="Open chat"
      >
        <img
          src="../../../img/dashboard/AI.png"
          alt="Chatbot"
          className="w-10"
        />
      </button>
    </div>
  );
};

export default ChatBot;
