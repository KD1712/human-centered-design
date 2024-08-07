import { Button, Pagination, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { UserResponseProps } from "./App";
import { submitResponse } from "./api";
import { getFormattedTimestamp } from "./helper function/timestamp";

interface Progress7Props {
  onNext: () => void;
  openingLine: string;
  prompts: string;
  userResponse: any;
  // updateUserResponse: (updatedResponse: Partial<UserResponseProps>) => void;
  updateUserResponse: (updatedResponse: any) => void;
}

export default function Progress7({
  onNext,
  openingLine,
  prompts,
  userResponse,
  updateUserResponse,
}: Progress7Props) {
  const [rating, setRating] = useState<number>(1); // Default rating
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentsChange = (value: string) => {
    setComments(value);
  };

  const handleFinish = async () => {
    const updatedResponse = {
      ...userResponse,
      // step_no: 7,
      // app_end_timestamp: new Date().toISOString(),
      rating: rating,
      feedback: comments,
      eventtype: "Step7FeedbackFinish",
      eventtime: getFormattedTimestamp(),
    };
    updateUserResponse(updatedResponse);
    console.log(updatedResponse);
    setLoading(true);
    await submitResponse(updatedResponse);
    setLoading(false);

    onNext();
  };

  return (
    <div>
      <p className="font-semibold text-xl m-1">Your Feedback</p>
      <div className="flex flex-col gap-2 my-2 mx-1">
        <p>
          We&apos;d love to know what you thought about this tutorial. How
          helpful was the AI tutor in improving your critical thinking skills?
        </p>
        <Pagination total={5} onChange={handleRatingChange} />

        <p className="my-2 mx-1">Any additional comments or suggestions?</p>
        <Textarea
          className="my-1"
          label="Type here..."
          value={comments}
          onChange={(e) => handleCommentsChange(e.target.value)}
        />
      </div>

      {loading ? (
        <Button className="bg-blue-400 text-white font-medium mx-1" isDisabled>
          Finish
          <p className="material-symbols-outlined">chevron_right</p>
        </Button>
      ) : (
        <Button
          className="bg-blue-400 text-white font-medium mx-1"
          onClick={handleFinish}
        >
          Finish
          <p className="material-symbols-outlined">chevron_right</p>
        </Button>
      )}
    </div>
  );
}
