"use-client";
import { Button, Card, CardBody, Textarea } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { UserResponseProps } from "./App";
import { submitResponse } from "./api";
import { getFormattedTimestamp } from "./helper function/timestamp";

interface Progress4Props {
  onNext: () => void;
  openingLine: string;
  prompts: string;
  userResponse: any;
  updateUserResponse: (updatedResponse: any) => void;
}

interface Message {
  role: "prompt" | "user" | "assistant";
  text: string;
}

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
    { role: "prompt", text: prompts },
    { role: "assistant", text: openingLine },
  ]);

  const [timerSeconds, setTimerSeconds] = useState(540); // Example starting value
  const [timerFinished, setTimerFinished] = useState(false);

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
          role: message.role === "user" ? "user" : "assistant",
          content: message.text,
        })),
        { role: "user", content: userMsg },
      ];

      const responseText = await fetchGPTResponse(conversationHistory);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", text: userMsg },
        { role: "assistant", text: responseText },
      ]);
      setUserMsg("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndConversation = async (finishtype: any) => {
    // Make sure the state is updated before using it
    const updatedResponse = {
      ...userResponse,
      messages: messages,
      eventtype: "Step4AIConvFinish",
      eventtime: getFormattedTimestamp(),
      stepFinishType: finishtype,
      timerRemainingSeconds: timerSeconds,
    };
    // updateUserResponse(updatedResponse);
    setLoading(true);
    // console.log(updatedResponse);
    await submitResponse(updatedResponse);
    setLoading(false);

    onNext();
  };

  useEffect(() => {
    // Set up the timer
    const timer = setInterval(() => {
      setTimerSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(timer);
          setTimerFinished(true); // Signal that the timer has finished
          return 0;
        }
      });
    }, 1000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [onNext]);

  useEffect(() => {
    if (timerFinished) {
      handleEndConversation("timer");
    }
  }, [timerFinished]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div>
      <div className="flex flex-row justify-between gap-1">
        <p className="font-semibold text-xl m-1">AI Tutor Conversation</p>{" "}
        <p className="font-semibold m-1 flex flex-row gap-1 bg-blue-100 align-middle items-center rounded-md justify-between p-2">
          {formatTime(timerSeconds)}
        </p>
      </div>
      {/* <div className="m-1 flex flex-row gap-1 bg-blue-100 align-middle items-center rounded-md justify-between p-2">
        <p>Topic: Identifying Underlying Assumptions</p>

        <p className="flex align-middle justify-center font-semibold">
          {formatTime(timerSeconds)}
        </p>
      </div> */}
      <Card className="flex flex-col text-center my-2 gap-2 p-1">
        <div className="flex flex-row items-center">
          <p className="font-bold m-2">Your Conversation...</p>
          {/* {loading && (
            <div className="w-4 h-4 border-2 border-t-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          )} */}
        </div>
        <CardBody className="h-[300px] overflow-y-auto">
          {messages.slice(1).map((message, index) => (
            <div key={index + 1}>
              {message.role === "user" ? (
                <div className="bg-gray-200 my-1 p-1 rounded">
                  <strong>User:</strong>{" "}
                  {message.text.split("\n").map((line, lineIndex) => (
                    <div key={lineIndex}>{line}</div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-200 my-1 p-1 rounded">
                  <div ref={messagesEndRef} />
                  <strong>AI:</strong>{" "}
                  {message.text.split("\n").map((line, lineIndex) => (
                    <div key={lineIndex}>{line}</div>
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
          <div className="flex flex-col gap-1 items-center">
            {loading && (
              <div className="w-5 h-5 border-3 border-t-3 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            )}
            <Button
              className="bg-blue-400 text-white font-medium min-w-[2rem] min-h-[2rem]"
              onClick={handleQuery}
              isDisabled={loading}
            >
              <p className="material-symbols-outlined">send</p>
            </Button>
          </div>
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
          onClick={(e) => handleEndConversation("user")}
        >
          End Conversation
          <p className="material-symbols-outlined">chevron_right</p>
        </Button>
      )}
    </div>
  );
}
