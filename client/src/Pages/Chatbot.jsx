import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { chatbotQuery } from "../data/api";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim()) {
      // Add user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      const userInput = input;
      setInput("");
      setIsLoading(true);

      try {
        // Kirim pesan ke API chatbot
        const response = await chatbotQuery(userInput);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: response.response,
            sender: "ai",
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Maaf, terjadi kesalahan saat memproses pesan Anda.",
            sender: "ai",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-64px)] bg-white p-4 sm:p-6">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-8 md:mb-12">
          Chatbot AI
        </h1>

        {/* Chat Messages Container */}
        <div className="w-full max-w-md sm:max-w-lg mb-6 sm:mb-8 space-y-3 sm:space-y-4 overflow-y-auto flex-grow">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl max-w-[80%] sm:max-w-[70%] ${
                msg.sender === "user"
                  ? "bg-gray-300 text-black self-end ml-auto"
                  : "bg-black text-white self-start mr-auto"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="bg-black text-white self-start mr-auto p-3 rounded-xl max-w-[80%] sm:max-w-[70%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Container */}
        <div className="w-full max-w-md sm:max-w-lg flex items-center sticky bottom-0 bg-white pb-2 pt-2 z-10 shadow-md">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Tanyakan sesuatu..."
              className="w-full bg-black text-white rounded-full py-2 sm:py-3 pl-4 sm:pl-5 pr-10 sm:pr-12 focus:outline-none focus:ring-2 focus:ring-gray-600 text-sm sm:text-base"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
