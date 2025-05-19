"use client";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/events");

    eventSource.onopen = () => {
      setConnectionStatus("Connected");
    };

    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    eventSource.onerror = (error) => {
      setConnectionStatus("Error connecting to server");
      console.log("EventSource failed:", error);
      eventSource.close();
    };
    
    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-bold">Web Analytics Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">{connectionStatus}</p>
      </div>

      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Server Messages:</h2>
        <ul className="space-y-2">
          {messages.map((message, index) => (
            <li
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md"
            >
              {message}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}