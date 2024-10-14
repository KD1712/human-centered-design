import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { UserResponseProps } from "./App";
import { submitResponse } from "./api";
import { getFormattedTimestamp } from "./helper function/timestamp";
interface Progress3Props {
  onNext: () => void;

  openingLine: string;
  prompts: string;
  // userResponse: UserResponseProps;
  userResponse: any;
  updateUserResponse: (updatedResponse: any) => void;
}

export default function Progress3({
  onNext,
  openingLine,
  prompts,
  userResponse,
  updateUserResponse,
}: Progress3Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const updatedResponse = {
      ...userResponse,
      // step_no: 3,
      eventtype: "Step3ConvInstructionsFinish",
      eventtime: getFormattedTimestamp(),
    };
    // updateUserResponse(updatedResponse);
    console.log(updatedResponse);
    setLoading(true);
    await submitResponse(updatedResponse);
    setLoading(false);

    onNext();
  };
  return (
    <div>
      <p className="font-semibold text-xl m-1">Meet Your AI Tutor</p>
      <div className="my-2 mx-1">
        <p>
          You&apos;re about to start a conversation with an AI tutor about
          identifying underlying assumptions in arguments. Here&apos;s what to
          expect:
        </p>

        <ul className="list-disc list-outside mx-4 my-3">
          <li>The session will last about 9 minutes.</li>
          <li>
            The tutor will guide you through examples and give you practice.
          </li>
          <li>Engage actively and don&apos;t hesitate to ask questions.</li>
        </ul>
        <p>
          Remember, identifying assumptions is about recognizing unstated
          beliefs that support an argument.
        </p>
      </div>

      {loading ? (
        <Button className="bg-blue-400 text-white font-medium m-1" isDisabled>
          Start Conversation
          <p className="material-symbols-outlined">chevron_right</p>
        </Button>
      ) : (
        <Button
          className="bg-blue-400 text-white font-medium m-1"
          onClick={handleSubmit}
        >
          Start Conversation
          <p className="material-symbols-outlined">chevron_right</p>
        </Button>
      )}
      {/* <div className="flex flex-row my-2 mx-1">
        <span className="material-symbols-outlined">info</span>
        <p>Progress: 3/7</p>
      </div> */}
    </div>
  );
}
