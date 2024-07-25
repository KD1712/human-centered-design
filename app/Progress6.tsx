import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { UserResponseProps } from "./App";
interface Progress6Props {
  onNext: () => void;
  openingLine: string;
  prompts: string;
  userResponse: UserResponseProps;
  updateUserResponse: (updatedResponse: Partial<UserResponseProps>) => void;
}

export default function Progress6({
  onNext,
  openingLine,
  prompts,
  userResponse,
  updateUserResponse,
}: Progress6Props) {
  const handleSubmit = () => {
    const updatedResponse = {
      ...userResponse,
      step_no: 6,
    };
    updateUserResponse(updatedResponse);
    console.log(updatedResponse);
    onNext();
  };
  return (
    <div>
      <p className="font-semibold text-xl m-1">Your Progress</p>
      <div className="my-1 mx-1">
        <p>
          Congratulations on completing the critical thinking tutorial!
          You&apos;ve improved your score by NaN%!
        </p>
        <ul className="list-disc list-outside mx-4 my-3">
          <li>Pre-test score: 0 out of 5</li>
          <li>Post-test score: 0 out of 5</li>
        </ul>
        <p>
          Remember, identifying underlying assumptions is a skill that improves
          with practice. Keep questioning the unstated beliefs in arguments you
          encounter daily.
        </p>
      </div>

      <Button
        className="bg-blue-400 text-white font-medium m-1"
        onClick={handleSubmit}
      >
        Finish
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
      {/* <div className="flex flex-row my-2 mx-1">
        <span className="material-symbols-outlined">info</span>
        <p>Progress: 6/7</p>
      </div> */}
    </div>
  );
}
