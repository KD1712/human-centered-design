import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
interface Progress6Props {
  onNext: () => void;
}

export default function Progress6({ onNext }: Progress6Props) {
  return (
    <div>
      <p className="font-semibold text-xl m-1">Your Progress</p>
      <div className="m-2">
        <p className="my-2">
          Congratulations on completing the critical thinking tutorial!
          <li>Pre-test score: 0 out of 5</li>
          <li>Post-test score: 0 out of 5</li>
          You&apos;ve improved your score by NaN%!
        </p>
        <p className="m-x-2">
          Remember, identifying underlying assumptions is a skill that improves
          with practice. Keep questioning the unstated beliefs in arguments you
          encounter daily.
        </p>
      </div>

      <Button
        className="bg-blue-400 text-white font-medium gap-x-px"
        onClick={onNext}
      >
        Finish
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
      <div className="flex flex-row my-2">
        <span className="material-symbols-outlined">info</span>
        <p>Progress: 6/7</p>
      </div>
    </div>
  );
}
