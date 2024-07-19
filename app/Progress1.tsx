import { Button } from "@nextui-org/react";
interface Progress1Props {
  onNext: () => void;
}

export default function Progress1({ onNext }: Progress1Props) {
  return (
    <div className="p-1 md:p-1 lg:p-1 w-full">
      <p className="font-semibold text-lg md:text-xl lg:text-2xl ">
        Welcome to the Critical Thinking Tutor
      </p>
      <p className="my-2 text-sm md:text-base lg:text-lg break-words">
        In this 15-minute session, you will improve your ability to identify
        underlying assumptions in arguments. This is a crucial skill for
        critical thinking. You will take a short pre-test, engage with an AI
        tutor, and then take a post-test to measure your improvement. Ready to
        sharpen your critical thinking skills?
      </p>
      <div className="flex">
        <Button
          className="bg-blue-400 text-white font-medium gap-x-px mt-2 md:mt-4 lg:mt-6"
          onClick={onNext}
        >
          Start
          <p className="material-symbols-outlined">chevron_right</p>
        </Button>
      </div>
      <div className="flex flex-row items-center my-1 space-x-1">
        <span className="material-symbols-outlined">info</span>
        <p className="text-xs md:text-sm lg:text-base">Progress: 1/7</p>
      </div>
    </div>

    // <div className="p-4 md:p-6 lg:p-8">
    //   <p className="font-semibold text-lg md:text-xl lg:text-2xl m-1">
    //     Welcome to the Critical Thinking Tutor
    //   </p>
    //   <p className="m-1 text-sm md:text-base lg:text-lg">
    //     In this 15-minute session, you will improve your ability to identify
    //     underlying assumptions in arguments. This is a crucial skill for
    //     critical thinking. You will take a short pre-test, engage with an AI
    //     tutor, and then take a post-test to measure your improvement. Ready to
    //     sharpen your critical thinking skills?
    //   </p>
    //   <div className="flex">
    //     <Button
    //       className="bg-blue-400 text-white font-medium gap-x-px mt-4 md:mt-6 lg:mt-8"
    //       onClick={onNext}
    //     >
    //       Start
    //       <p className="material-symbols-outlined">chevron_right</p>
    //     </Button>
    //   </div>
    //   <div className="flex flex-row my-2 space-x-1">
    //     <span className="material-symbols-outlined">info</span>
    //     <p className="text-xs md:text-sm lg:text-base">Progress: 1/7</p>
    //   </div>
    // </div>
  );
}
