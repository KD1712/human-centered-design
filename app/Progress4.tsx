import {
  Button,
  Card,
  CardBody,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import { FullPageChat } from "flowise-embed-react";
import { useEffect, useState, useRef } from "react";

interface Progress4Props {
  onNext: () => void;
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

  return <span>{formatTime(seconds)}</span>;
};

export default function Progress4({ onNext }: Progress4Props) {
  const [userMsg, setUserMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function query(data: object) {
    const response = await fetch(
      "https://flowise-nbr6.onrender.com/api/v1/prediction/60a415f2-0a00-4a64-af86-b54f0d35f892",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }
  const handleQuery = () => {
    setLoading(true);
    query({ question: userMsg })
      .then((response) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "question", text: userMsg },
          { type: "response", text: response.text },
        ]);
        setUserMsg("");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <p className="font-semibold text-xl m-1">
        AI Tutor Conversation <Timer onNext={onNext} />
      </p>
      <div className="m-4 ">
        <p>Topic: Identifying Underlying Assumptions</p>
      </div>
      <Card className="flex flex-col text-center m-4">
        <CardBody className="h-[300px] overflow-y-auto">
          <p className="font-bold">Your Conversation...</p>
          {messages.map((message, index) => (
            <div key={index}>
              {message.type === "question" ? (
                <div className="bg-blue-100 my-1 p-1 rounded">
                  <strong>User:</strong> {message.text}
                </div>
              ) : (
                <div className="bg-blue-100 my-1 p-1 rounded">
                  <strong>AI:</strong> {message.text}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ))}
        </CardBody>
        <div className="flex flex-row gap-1 p-1  items-center">
          <Textarea
            placeholder="Enter your msg"
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
          />
          {loading && (
            <Button
              className="bg-blue-400 text-white font-medium gap-x-px"
              isDisabled
            >
              Send
              <p className="material-symbols-outlined">send</p>
            </Button>
          )}
          {!loading && (
            <Button
              className="bg-blue-400 text-white font-medium gap-x-px"
              onClick={handleQuery}
            >
              Send
              <p className="material-symbols-outlined">send</p>
            </Button>
          )}
        </div>
      </Card>

      <Button
        className="bg-blue-400 text-white font-medium gap-x-px"
        onClick={onNext}
      >
        End Conversation
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
      <div className="flex flex-row my-2">
        <span className="material-symbols-outlined">info</span>
        <p>Progress: 4/7</p>
      </div>
    </div>
  );
}
