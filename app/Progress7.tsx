import {
  Button,
  Pagination,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
interface Progress7Props {
  onNext: () => void;
}

export default function Progress7({ onNext }: Progress7Props) {
  return (
    <div>
      <p className="font-semibold text-xl m-1">Your Feedback</p>
      <div className="m-4 ">
        {/* <p className="">
          Congratulations on completing the critical thinking tutorial!
          <li>The session will last about 9 minutes.</li>
          <li>
            The tutor will guide you through examples and give you practice.
          </li>
          <li>Engage actively and don&apos;t hesitate to ask questions.</li>
        </p> */}
        <p>
          We&apos;d love to know what you thought about this tutorial. How
          helpful was the AI tutor in improving your critical thinking skills?
        </p>

        <Pagination className="my-1" total={5} />
        <p>Any additional comments or suggestions?</p>
        <Textarea className="my-2" label="Type here..." />
      </div>

      <Button
        className="bg-blue-400 text-white font-medium gap-x-px"
        onClick={onNext}
      >
        Finish
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
      {/* <div className="flex flex-row my-2">
        <span className="material-symbols-outlined">info</span>
        <p>Progress: 7/7</p>
      </div> */}
    </div>
  );
}
