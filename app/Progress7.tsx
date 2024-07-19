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
      <div className="my-2 mx-1">
        <p>
          We&apos;d love to know what you thought about this tutorial. How
          helpful was the AI tutor in improving your critical thinking skills?
        </p>

        <Pagination total={5} />
        <p className="my-3">Any additional comments or suggestions?</p>
        <Textarea className="my-1" label="Type here..." />
      </div>

      <Button
        className="bg-blue-400 text-white font-medium mx-1"
        onClick={onNext}
      >
        Finish
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
    </div>
  );
}
