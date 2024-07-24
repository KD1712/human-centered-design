import { Button, Pagination, Textarea } from "@nextui-org/react";
import { useState } from "react";

interface Progress7Props {
  onNext: () => void;

  openingLine: string;
  prompts: string;
}

export default function Progress7({
  onNext,

  openingLine,
  prompts,
}: Progress7Props) {
  const [rating, setRating] = useState<number>(1); // Default rating
  const [comments, setComments] = useState("");

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentsChange = (value: string) => {
    setComments(value);
  };

  const handleFinish = () => {
    const data = {
      rating,
      comments,
    };
    console.log(data);
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
        <Pagination total={5} />

        <p className="my-2 mx-1">Any additional comments or suggestions?</p>
        <Textarea
          className="my-1"
          label="Type here..."
          value={comments}
          onChange={(e) => handleCommentsChange(e.target.value)}
        />
      </div>

      <Button
        className="bg-blue-400 text-white font-medium mx-1"
        onClick={handleFinish}
      >
        Finish
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
    </div>
  );
}
