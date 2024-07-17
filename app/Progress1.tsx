import { Button } from "@nextui-org/react";
interface Progress1Props {
  onNext: () => void;
}

export default function Progress1({ onNext }: Progress1Props) {
  return (
    <div>
      <p className="font-semibold text-xl m-1">
        Welcome to the Critical Thinking Tutor
      </p>
      <p className="m-1">
        In this 15-minute session, you'll improve your ability to identify
        underlying assumptions in arguments. This is a crucial skill for
        critical thinking. You'll take a short pre-test, engage with an AI
        tutor, and then take a post-test to measure your improvement. Ready to
        sharpen your critical thinking skills?
      </p>
      <Button
        className="bg-blue-400 text-white font-medium gap-x-px"
        onClick={onNext}
      >
        Start
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
      <div className="flex flex-row my-2">
        <span className="material-symbols-outlined">info</span>
        <p>Progress: 1/7</p>
      </div>
    </div>
  );
}
