"use-client";
import { Button, Card, CardBody, Textarea } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { UserResponseProps } from "./App";
import { submitResponse } from "./api";

interface Progress4Props {
  onNext: () => void;
  openingLine: string;
  prompts: string;
  userResponse: UserResponseProps;
  updateUserResponse: (updatedResponse: Partial<UserResponseProps>) => void;
}

interface Message {
  type: "question" | "response";
  text: string;
}

const Timer: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [seconds, setSeconds] = useState(540); // 9 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(timer);
          onNext(); // Call the callback function when timer expires
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNext]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <p className="flex align-middle justify-center font-semibold">
      {formatTime(seconds)}
    </p>
  );
};

export default function Progress4({
  onNext,
  openingLine,
  prompts,
  userResponse,
  updateUserResponse,
}: Progress4Props) {
  const [userMsg, setUserMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: "response", text: openingLine },
  ]);
  // console.log(messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const contextPrompt = prompts;

  const fetchGPTResponse = async (conversationHistory: any) => {
    const apiKey = process.env.NEXT_PUBLIC_OPEN_API_KEY;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: conversationHistory,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from OpenAI");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const handleQuery = async () => {
    setLoading(true);
    try {
      const conversationHistory = [
        { role: "system", content: contextPrompt },
        ...messages.map((message) => ({
          role: message.type === "question" ? "user" : "assistant",
          content: message.text,
        })),
        { role: "user", content: userMsg },
      ];

      const responseText = await fetchGPTResponse(conversationHistory);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "question", text: userMsg },
        { type: "response", text: responseText },
      ]);
      setUserMsg("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndConversation = async () => {
    const updatedResponse = {
      ...userResponse,
      messages: messages,
      step_no: 4,
    };
    updateUserResponse(updatedResponse);
    setLoading(true);
    await submitResponse(updatedResponse);
    setLoading(false);

    onNext();
  };

  return (
    <div>
      <p className="font-semibold text-xl m-1">AI Tutor Conversation</p>
      <div className="m-1 flex flex-row gap-1 bg-blue-100 align-middle items-center rounded-md justify-between p-2">
        <p>Topic: Identifying Underlying Assumptions</p>
        <Timer onNext={onNext} />
      </div>
      <Card className="flex flex-col text-center my-2 gap-2 p-1">
        <div className="flex flex-row items-center">
          <p className="font-bold m-2">Your Conversation...</p>
          {loading && (
            <div className="w-4 h-4 border-2 border-t-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          )}
        </div>
        <CardBody className="h-[300px] overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index}>
              {/* {message.type === "question" ? (
                <div className="bg-gray-200 my-1 p-1 rounded">
                  <strong>User:</strong> {message.text}
                </div>
              ) : (
                <div className="bg-gray-200 my-1 p-1 rounded">
                  <div ref={messagesEndRef} />
                  <strong>AI:</strong> {message.text}
                </div>
              )} */}
              {message.type === "question" ? (
                <div className="bg-gray-200 my-1 p-1 rounded">
                  <strong>User:</strong>{" "}
                  {message.text.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-200 my-1 p-1 rounded">
                  <div ref={messagesEndRef} />
                  <strong>AI:</strong>{" "}
                  {message.text.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardBody>

        <div className="flex flex-row gap-1 items-center m-1">
          <Textarea
            fullWidth={true}
            placeholder="Enter your message"
            value={userMsg}
            onValueChange={setUserMsg}
          />
          <Button
            className="bg-blue-400 text-white font-medium min-w-[2rem] min-h-[2rem]"
            onClick={handleQuery}
            isDisabled={loading}
          >
            <p className="material-symbols-outlined">send</p>
          </Button>
        </div>
      </Card>

      {loading ? (
        <Button className="bg-blue-400 text-white font-medium" isDisabled>
          End Conversation
          <p className="material-symbols-outlined">chevron_right</p>
        </Button>
      ) : (
        <Button
          className="bg-blue-400 text-white font-medium"
          onClick={handleEndConversation}
        >
          End Conversation
          <p className="material-symbols-outlined">chevron_right</p>
        </Button>
      )}
    </div>
  );
}
