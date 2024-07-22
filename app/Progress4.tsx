import { Button, Card, CardBody, Textarea } from "@nextui-org/react";
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

  return (
    <p className="flex align-middle justify-center font-semibold">
      {formatTime(seconds)}
    </p>
  );
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
  const handleQuery = async () => {
    setLoading(true);
    try {
      const responseText = await fetchGPTResponse(userMsg);
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

  const fetchGPTResponse = async (prompt: string) => {
    const apiKey = process.env.NEXT_PUBLIC_OPEN_API_KEY;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from OpenAI");
    }

    const data = await response.json();
    console.log(data);
    return data.choices[0].message.content;
  };

  return (
    <div>
      <p className="font-semibold text-xl m-1">AI Tutor Conversation</p>
      <div className="m-1 flex flex-row gap-1 bg-blue-100 align-middle items-center rounded-md justify-between p-2">
        <p>Topic: Identifying Underlying Assumptions</p>{" "}
        <Timer onNext={onNext} />
      </div>
      <Card className="flex flex-col text-center my-2 gap-2 p-1">
        <div className="flex flex-row items-center">
          {" "}
          <p className="font-bold m-2">Your Conversation...</p>
          {loading && (
            <div className="w-4 h-4 border-2 border-t-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          )}
        </div>
        <CardBody className="h-[300px] overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index}>
              {message.type === "question" ? (
                <div className="bg-gray-200 my-1 p-1 rounded">
                  <strong>User:</strong> {message.text}
                </div>
              ) : (
                <div className="bg-gray-200 my-1 p-1 rounded">
                  <div ref={messagesEndRef} />
                  <strong>AI:</strong> {message.text}
                </div>
              )}
            </div>
          ))}
        </CardBody>

        <div className="flex flex-row gap-1 items-center m-1">
          <Textarea
            fullWidth={true}
            placeholder="Enter your msg"
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
          />
          {loading && (
            <Button
              className="bg-blue-400 text-white font-medium gap-x-px min-w-[2rem] min-h-[2rem]"
              isDisabled
            >
              <p className="material-symbols-outlined">send</p>
            </Button>
          )}
          {!loading && (
            <Button
              className="bg-blue-400 text-white font-medium min-w-[2rem] min-h-[2rem]"
              onClick={handleQuery}
              // onClick={fetchGPTResponse(userMsg)}
            >
              <p className="material-symbols-outlined">send</p>
            </Button>
          )}
        </div>
      </Card>

      <Button className="bg-blue-400 text-white font-medium" onClick={onNext}>
        End Conversation
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
      {/* <div className="flex flex-row my-2">
        <span className="material-symbols-outlined">info</span>
        <p>Progress: 4/7</p>
      </div> */}
    </div>
  );
}
