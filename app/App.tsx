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
    <Card className="w-full max-w-[900px] mx-auto">
      <CardHeader className="bg-blue-400 min-w-screen font-bold text-2xl">
        Critical Thinking Tutor
      </CardHeader>
      <CardBody className="w-[850px]">
        {currentProgress === 1 && <Progress1 onNext={handleNext} />}
        {currentProgress === 2 && <Progress2 onNext={handleNext} />}
        {currentProgress === 3 && <Progress3 onNext={handleNext} />}
        {currentProgress === 4 && <Progress4 onNext={handleNext} />}
        {currentProgress === 5 && <Progress5 onNext={handleNext} />}
        {currentProgress === 6 && <Progress6 onNext={handleNext} />}
        {currentProgress === 7 && <Progress7 onNext={handleNext} />}
      </CardBody>
    </Card>
  );
}
