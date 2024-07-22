"use-client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Progress1 from "./Progress1";
import Progress2 from "./Progress2";
import { useState } from "react";
import Progress3 from "./Progress3";
import Progress4 from "./Progress4";
import Progress5 from "./Progress5";
import Progress6 from "./Progress6";
import Progress7 from "./Progress7";
export default function App() {
  const [currentProgress, setCurrentProgress] = useState(1);

  const handleNext = () => {
    if (currentProgress === 7) {
      setCurrentProgress(1);
    } else {
      setCurrentProgress(currentProgress + 1);
    }
  };
  return (
    <div className="flex flex-col min-h-screen items-start justify-center p-1">
      <div className="flex flex-col w-full min-w-screen items-center justify-center p-1">
        <Card className="w-full max-w-[850px] mx-auto">
          <CardHeader className="bg-blue-400 min-w-screen font-bold text-white text-2xl">
            Critical Thinking Tutor
          </CardHeader>
          <CardBody className="w-full">
            {currentProgress === 1 && <Progress1 onNext={handleNext} />}
            {currentProgress === 2 && <Progress2 onNext={handleNext} />}
            {currentProgress === 3 && <Progress3 onNext={handleNext} />}
            {currentProgress === 4 && <Progress4 onNext={handleNext} />}
            {currentProgress === 5 && <Progress5 onNext={handleNext} />}
            {currentProgress === 6 && <Progress6 onNext={handleNext} />}
            {currentProgress === 7 && <Progress7 onNext={handleNext} />}
          </CardBody>
        </Card>
        {currentProgress != 7 && (
          <div className="flex flex-row items-center m-2 rounded-none border-transparent w-full max-w-[850px] bg-transparent text-[#6d6d6d] gap-2 text-xs md:text-sm lg:text-base">
            <span className="material-symbols-outlined">info</span>
            <p className="text-sm md:text-sm lg:text-base">
              Progress: {currentProgress}/7
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
