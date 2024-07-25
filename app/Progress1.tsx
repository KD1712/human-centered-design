import { Button } from "@nextui-org/react";
import { useEffect } from "react";
interface Progress1Props {
  onNext: () => void;
  openingLine: string;
  prompts: string;
  sessionid: string;
}

export default function Progress1({
  onNext,
  openingLine,
  prompts,
  sessionid,
}: Progress1Props) {
  useEffect(() => {
    // console.log(sessionid);
    // console.log(openingLine);
  }, [sessionid]);
  const handleSubmit = () => {
    const data = {
      step_no: 1,
      sessionid: sessionid,
      app_start_timestamp: new Date().toISOString(),
    };
    console.log(data);
    onNext();
  };
  return (
    <div className="flex flex-col gap-2 p-1 md:p-1 lg:p-1 w-full">
      <p className="font-semibold text-lg md:text-xl lg:text-2xl ">
        Welcome to the Critical Thinking Tutor
      </p>
      <div className="flex flex-col gap-2 text-sm md:text-base lg:text-lg">
        <p>
          In this 15-minute session, you will improve your ability to identify
          underlying assumptions in arguments. This is a crucial skill for
          critical thinking.
        </p>
        <p>
          You will take a short pre-test, engage with an AI tutor, and then take
          a post-test to measure your improvement.{" "}
        </p>
        <p>Ready to sharpen your critical thinking skills?</p>
      </div>

      <div className="flex">
        <Button
          className="bg-blue-400 text-white font-medium gap-x-px md:mt-4 lg:mt-3"
          onClick={handleSubmit}
        >
          Start
          <p className="material-symbols-outlined">chevron_right</p>
        </Button>
      </div>
    </div>
  );
}
