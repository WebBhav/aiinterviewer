import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const InterviewRoom = () => {
  const { state } = useLocation();
  const [question, setQuestion] = useState("Say, Thank you, Please start the interview");
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins

  useEffect(() => {
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

    speakText("Welcome to the interview", () => {
      startSpeechRecognition();
    });

    return () => clearInterval(interval);
  }, []);

  const speakText = (text, onEnd) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.pitch = 1;
    utterance.rate = 1;
    if (onEnd) {
      utterance.onend = onEnd;
    }
    speechSynthesis.speak(utterance);
  };

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const userAnswer = event.results[0][0].transcript;
      console.log("User said:", userAnswer);
      fetchGeminiResponse(userAnswer);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
    };

    recognition.start();
  };

  const fetchGeminiResponse = async (userInput) => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCBDLk1O6N172fvVe4h9db1jkGBYpK9Dq8`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an interviewer for a full time ${state.role} role. Based on the candidate's answer: "${userInput}", ask the next follow-up question. 
                Keep it brief (10-30 words), natural, and don't repeat the candidate's response. 
                Respond as a human interviewer would — no asterisks, no markdown, no formatting. Just plain conversational text.`
                }
                ,
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Thank you for your response.";
    setQuestion(geminiText);
    speakText(geminiText, () => {
      startSpeechRecognition(); // Keep the loop going
    });
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-white text-center px-6"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-2xl max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4">{question}</h1>
        <p className="text-sm">
          Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

export default InterviewRoom;
