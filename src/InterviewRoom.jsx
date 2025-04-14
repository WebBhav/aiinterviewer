import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const InterviewRoom = () => {
  const { state } = useLocation();
  const [question, setQuestion] = useState("Welcome to your interview.");
  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    speakText("Welcome to your interview.");

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setQuestion("Interview session has ended.");
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="h-screen bg-cover text-white p-10" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="text-3xl mb-4">{question}</div>
      <div className="text-sm">Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
    </div>
  );
};

export default InterviewRoom;