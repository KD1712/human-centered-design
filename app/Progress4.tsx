import { Button, Card, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
interface Progress4Props {
  onNext: () => void;
}
interface TimerProps {
  onTimerComplete: () => void;
}

export default function Progress4({ onNext }: Progress4Props) {
  const Timer: React.FC = () => {
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
    }, []);

    const formatTime = (timeInSeconds: number): string => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    return <span>{formatTime(seconds)}</span>;
  };
  return (
    <div>
      <p className="font-semibold text-xl m-1">
        AI Tutor Conversation <Timer />
      </p>
      <div className="m-4 ">
        <p>Topic: Identifying Underlying Assumptions</p>
      </div>
      <Card className="flex flex-col text-center m-4">AI CONVERSATION</Card>

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
