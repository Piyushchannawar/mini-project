"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Message } from "../types";

const Chatbot = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: userInput },
    ];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
        
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(userInput);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: result.response.text() },
      ]);
    } catch (error) {
      console.error("Error generating content:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[600px] bg-gray-800 rounded-lg overflow-hidden flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.sender === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700 mr-auto"
              }`}
            >
              {message.text}
            </div>
          ))}
          {loading && (
            <div className="p-3 rounded-lg bg-gray-700 mr-auto animate-pulse">
              AI is typing...
            </div>
          )}
        </div>
        <div className="p-4 bg-gray-900">
          <input
            type="text"
            className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button
            className="mt-2 w-full bg-blue-600 text-white p-2 rounded-lg"
            onClick={handleSendMessage}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
