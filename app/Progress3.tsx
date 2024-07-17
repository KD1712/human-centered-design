import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
interface Progress3Props {
  onNext: () => void;
}

export default function Progress3({ onNext }: Progress3Props) {
  return (
    <div>
      <p className="font-semibold text-xl m-1">Meet Your AI Tutor</p>
      <div className="m-4 ">
        <p className="">
          You&apos;re about to start a conversation with an AI tutor about
          identifying underlying assumptions in arguments. Here&apos;s what to
          expect:
          <li>The session will last about 9 minutes.</li>
          <li>
            The tutor will guide you through examples and give you practice.
          </li>
          <li>Engage actively and don&apos;t hesitate to ask questions.</li>
        </p>
        <p className="m-x-2">
          Remember, identifying assumptions is about recognizing unstated
          beliefs that support an argument.
        </p>
      </div>

      <Button
        className="bg-blue-400 text-white font-medium gap-x-px"
        onClick={onNext}
      >
        Start Conversation
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
      <div className="flex flex-row my-2">
        <span className="material-symbols-outlined">info</span>
        <p>Progress: 3/7</p>
      </div>
    </div>
  );
}
