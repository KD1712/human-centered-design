import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { UserResponseProps } from "./App";
import { submitResponse } from "./api";
import { getFormattedTimestamp } from "./helper function/timestamp";

interface Progress1Props {
  onNext: () => void;
  openingLine: string;
  prompts: string;
  userResponse: any;
  updateUserResponse: (updatedResponse: any) => void;
}

export default function Progress1({
  onNext,
  openingLine,
  prompts,
  userResponse,
  updateUserResponse,
}: Progress1Props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(userResponse);
    const logInitialData = async () => {
      await submitResponse(userResponse);
    };
    logInitialData();
  }, []);

  const handleSubmit = async () => {
    const updatedResponse = {
      ...userResponse,
      // step_no: 1,
      // app_start_timestamp: new Date().toISOString(),
      eventtype: "Step1IntroFinish",
      eventtime: getFormattedTimestamp(),
    };
    updateUserResponse(updatedResponse);
    // console.log(updatedResponse);
    setLoading(true);
    await submitResponse(updatedResponse);
    setLoading(false);

    onNext();
  };

  return (
    <div className="flex flex-col gap-2 p-1 md:p-1 lg:p-1 w-full">
      {loading ? <p>LOADING</p> : ""}
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
        {loading ? (
          <Button
            className="bg-blue-400 text-white font-medium gap-x-px md:mt-4 lg:mt-3"
            isDisabled
          >
            Start
            <p className="material-symbols-outlined">chevron_right</p>
          </Button>
        ) : (
          <Button
            className="bg-blue-400 text-white font-medium gap-x-px md:mt-4 lg:mt-3"
            onClick={handleSubmit}
          >
            Start
            <p className="material-symbols-outlined">chevron_right</p>
          </Button>
        )}
      </div>
    </div>
  );
}
