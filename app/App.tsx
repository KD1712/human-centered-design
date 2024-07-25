// "use-client";
// import { Card, CardBody, CardHeader } from "@nextui-org/react";
// import Progress1 from "./Progress1";
// import Progress2 from "./Progress2";
// import { useState } from "react";
// import Progress3 from "./Progress3";
// import Progress4 from "./Progress4";
// import Progress5 from "./Progress5";
// import Progress6 from "./Progress6";
// import Progress7 from "./Progress7";
// export default function App() {
//   const [currentProgress, setCurrentProgress] = useState(1);

//   const handleNext = () => {
//     if (currentProgress === 7) {
//       setCurrentProgress(1);
//     } else {
//       setCurrentProgress(currentProgress + 1);
//     }
//   };

//   const approach = ["approach-A", "approach-B", "approach-C"];
//   const openingLine = [
//     "Hello, eager thinker! Ready to explore assumptions in arguments? Choose your preferred area: A) Political debates, B) Scientific claims, or C) Everyday conversations. Type A, B, or C to begin our Socratic journey!",
//     "Greetings, perspective explorer! Ready to uncover hidden assumptions? Pick a topic: 1) Environmental policies, 2) Economic theories, or 3) Social media trends. Reply with 1, 2, or 3 to start our contrasting viewpoints adventure!",
//     "Hi there, real-world thinker! Ready to spot assumptions in daily life? Choose your focus: X) Personal relationships, Y) Professional decisions, or Z) Media consumption. Respond with X, Y, or Z to begin!",
//   ];
//   const prompts = [
//     "You are an AI tutor specialized in teaching critical thinking, specifically the skill of identifying underlying assumptions in arguments. Your approach is based on Socratic questioning. Always respond to the user with thought-provoking questions that guide them to discover insights on their own. Use a friendly, encouraging tone. Your goal is to help the user identify assumptions in increasingly complex arguments, starting with simple examples and progressively moving to more challenging ones. Provide positive reinforcement when the user correctly identifies assumptions, and offer gentle guidance when they struggle. Always explain why something is an assumption when revealed. Throughout the session, emphasize how understanding assumptions can improve critical thinking and decision-making in various aspects of life. End the session by summarizing key strategies for identifying assumptions.",
//     "You are an AI tutor focused on teaching critical thinking, particularly the identification of underlying assumptions in arguments. Your method involves presenting contrasting scenarios to highlight how different assumptions lead to different conclusions. Maintain a curious and open-minded tone, encouraging the user to explore multiple perspectives. Present pairs of contrasting viewpoints and guide the user to identify the different assumptions in each. Progressively increase the complexity of the scenarios. Praise the user for recognizing different assumptions and gently correct misunderstandings. Throughout the session, emphasize how assumptions shape our interpretations and decision-making. Your goal is to help the user understand how diverse assumptions can lead to vastly different conclusions, even when looking at the same information. Conclude by summarizing how understanding diverse assumptions can improve critical thinking in various aspects of life.",
//     "You are an AI tutor specializing in critical thinking, with a focus on identifying underlying assumptions in arguments. Your approach centers on real-world applications and personal relevance. Use examples from everyday life, current events, and common personal beliefs to illustrate assumptions. Maintain a relatable and engaging tone, encouraging the user to connect the concepts to their own experiences. Guide the user to apply critical thinking skills to their daily life and decision-making processes. Provide positive reinforcement for successful identification of assumptions and supportive guidance for challenges. Consistently relate the skill of identifying assumptions to practical benefits in the user's life, emphasizing how this skill can improve decision-making in personal relationships, professional settings, and media consumption. Conclude the session by helping the user reflect on their own beliefs and the assumptions that underlie them.",
//   ];

//   return (
//     <div className="flex flex-col min-h-screen items-start justify-center p-1">
//       <div className="flex flex-col w-full min-w-screen items-center justify-center p-1">
//         <Card className="w-full max-w-[850px] mx-auto">
//           <CardHeader className="bg-blue-400 min-w-screen font-bold text-white text-2xl">
//             Critical Thinking Tutor
//           </CardHeader>
//           <CardBody className="w-full">
//             {currentProgress === 1 && <Progress1 onNext={handleNext} />}
//             {currentProgress === 2 && <Progress2 onNext={handleNext} />}
//             {currentProgress === 3 && <Progress3 onNext={handleNext} />}
//             {currentProgress === 4 && <Progress4 onNext={handleNext} />}
//             {currentProgress === 5 && <Progress5 onNext={handleNext} />}
//             {currentProgress === 6 && <Progress6 onNext={handleNext} />}
//             {currentProgress === 7 && <Progress7 onNext={handleNext} />}
//           </CardBody>
//         </Card>
//         {currentProgress != 7 && (
//           <div className="flex flex-row items-center m-2 rounded-none border-transparent w-full max-w-[850px] bg-transparent text-[#6d6d6d] gap-2 text-xs md:text-sm lg:text-base">
//             <span className="material-symbols-outlined">info</span>
//             <p className="text-sm md:text-sm lg:text-base">
//               Progress: {currentProgress}/7
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use-client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Progress1 from "./Progress1";
import Progress2 from "./Progress2";
import { useState, useEffect } from "react";
import Progress3 from "./Progress3";
import Progress4 from "./Progress4";
import Progress5 from "./Progress5";
import Progress6 from "./Progress6";
import Progress7 from "./Progress7";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [currentProgress, setCurrentProgress] = useState(1);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [previousIndices, setPreviousIndices] = useState<number[]>([]);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    if (currentProgress === 1) {
      setRandomIndex(generateUniqueRandomIndex());
      setSessionId(uuidv4());
    }
  }, [currentProgress]);

  const handleNext = () => {
    if (currentProgress === 7) {
      setCurrentProgress(1);
    } else {
      setCurrentProgress(currentProgress + 1);
    }
  };

  const generateUniqueRandomIndex = (): number => {
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * 3);
    } while (previousIndices.includes(newIndex));

    setPreviousIndices((prev) => {
      const newPrev = [...prev, newIndex];
      return newPrev.length === 3 ? [] : newPrev;
    });

    return newIndex;
  };

  // const approach = ["approach-A", "approach-B", "approach-C"];
  // const openingLine1 = [
  //   `Hello, eager thinker! Ready to explore assumptions in arguments? Choose your preferred area:
  //    A) Political debates
  //    B) Scientific claims C) Everyday conversations.
  //   Type A, B, or C to begin our Socratic journey!`,
  //   `Greetings, perspective explorer! Ready to uncover hidden assumptions? Pick a topic:
  //   1) Environmental policies
  //   2) Economic theories
  //   3) Social media trends.
  //   Reply with 1, 2, or 3 to start our contrasting viewpoints adventure!`,
  //   `Hi there, real-world thinker! Ready to spot assumptions in daily life? Choose your focus:
  //   X) Personal relationships
  //   Y) Professional decisions
  //   Z) Media consumption.
  //   Respond with X, Y, or Z to begin!`,
  // ];
  const openingLine = [
    `Hello, eager thinker! Ready to explore assumptions in arguments? Choose your preferred area:\nA) Political debates\nB) Scientific claims\nC) Everyday conversations.\nType A, B, or C to begin our Socratic journey!`,
    `Greetings, perspective explorer! Ready to uncover hidden assumptions? Pick a topic:\n1) Environmental policies\n2) Economic theories\n3) Social media trends.\nReply with 1, 2, or 3 to start our contrasting viewpoints adventure!`,
    `Hi there, real-world thinker! Ready to spot assumptions in daily life? Choose your focus:\nX) Personal relationships\nY) Professional decisions\nZ) Media consumption.\nRespond with X, Y, or Z to begin!`,
  ];
  // const openingLine = openingLine1[1].split("\n");
  const prompts = [
    "You are an AI tutor specialized in teaching critical thinking, specifically the skill of identifying underlying assumptions in arguments. Your approach is based on Socratic questioning. Always respond to the user with thought-provoking questions that guide them to discover insights on their own. Use a friendly, encouraging tone. Your goal is to help the user identify assumptions in increasingly complex arguments, starting with simple examples and progressively moving to more challenging ones. Provide positive reinforcement when the user correctly identifies assumptions, and offer gentle guidance when they struggle. Always explain why something is an assumption when revealed. Throughout the session, emphasize how understanding assumptions can improve critical thinking and decision-making in various aspects of life. End the session by summarizing key strategies for identifying assumptions.",
    "You are an AI tutor focused on teaching critical thinking, particularly the identification of underlying assumptions in arguments. Your method involves presenting contrasting scenarios to highlight how different assumptions lead to different conclusions. Maintain a curious and open-minded tone, encouraging the user to explore multiple perspectives. Present pairs of contrasting viewpoints and guide the user to identify the different assumptions in each. Progressively increase the complexity of the scenarios. Praise the user for recognizing different assumptions and gently correct misunderstandings. Throughout the session, emphasize how assumptions shape our interpretations and decision-making. Your goal is to help the user understand how diverse assumptions can lead to vastly different conclusions, even when looking at the same information. Conclude by summarizing how understanding diverse assumptions can improve critical thinking in various aspects of life.",
    "You are an AI tutor specializing in critical thinking, with a focus on identifying underlying assumptions in arguments. Your approach centers on real-world applications and personal relevance. Use examples from everyday life, current events, and common personal beliefs to illustrate assumptions. Maintain a relatable and engaging tone, encouraging the user to connect the concepts to their own experiences. Guide the user to apply critical thinking skills to their daily life and decision-making processes. Provide positive reinforcement for successful identification of assumptions and supportive guidance for challenges. Consistently relate the skill of identifying assumptions to practical benefits in the user's life, emphasizing how this skill can improve decision-making in personal relationships, professional settings, and media consumption. Conclude the session by helping the user reflect on their own beliefs and the assumptions that underlie them.",
  ];

  // const selectedApproach = randomIndex !== null ? approach[randomIndex] : "";
  const selectedOpeningLine =
    randomIndex !== null ? openingLine[randomIndex] : "";
  const selectedPrompts = randomIndex !== null ? prompts[randomIndex] : "";

  return (
    <div className="flex flex-col min-h-screen items-start justify-center p-1">
      <div className="flex flex-col w-full min-w-screen items-center justify-center p-1">
        <Card className="w-full max-w-[850px] mx-auto">
          <CardHeader className="bg-blue-400 min-w-screen font-bold text-white text-2xl">
            Critical Thinking Tutor
          </CardHeader>
          <CardBody className="w-full">
            {currentProgress === 1 && (
              <Progress1
                onNext={handleNext}
                openingLine={selectedOpeningLine}
                prompts={selectedPrompts}
                sessionid={sessionId}
              />
            )}
            {currentProgress === 2 && (
              <Progress2
                onNext={handleNext}
                openingLine={selectedOpeningLine}
                prompts={selectedPrompts}
                sessionid={sessionId}
              />
            )}
            {currentProgress === 3 && (
              <Progress3
                onNext={handleNext}
                openingLine={selectedOpeningLine}
                prompts={selectedPrompts}
                sessionid={sessionId}
              />
            )}
            {currentProgress === 4 && (
              <Progress4
                onNext={handleNext}
                openingLine={selectedOpeningLine}
                prompts={selectedPrompts}
                sessionid={sessionId}
              />
            )}
            {currentProgress === 5 && (
              <Progress5
                onNext={handleNext}
                openingLine={selectedOpeningLine}
                prompts={selectedPrompts}
                sessionid={sessionId}
              />
            )}
            {currentProgress === 6 && (
              <Progress6
                onNext={handleNext}
                openingLine={selectedOpeningLine}
                prompts={selectedPrompts}
                sessionid={sessionId}
              />
            )}
            {currentProgress === 7 && (
              <Progress7
                onNext={handleNext}
                openingLine={selectedOpeningLine}
                prompts={selectedPrompts}
                sessionid={sessionId}
              />
            )}
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
