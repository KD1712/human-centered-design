// import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
// import { useState } from "react";
// import { UserResponseProps } from "./App";
// import { submitResponse } from "./api";
// import { getFormattedTimestamp } from "./helper function/timestamp";

// interface Progress5Props {
//   onNext: () => void;
//   openingLine: string;
//   prompts: string;
//   userResponse: any;
//   updateUserResponse: (updatedResponse: any) => void;
// }

// export default function Progress5({
//   onNext,
//   openingLine,
//   prompts,
//   userResponse,
//   updateUserResponse,
// }: Progress5Props) {
//   const [questions, setQuestions] = useState(Array(10).fill(""));
//   const [question11A, setQuestion11A] = useState("");
//   const [question11B, setQuestion11B] = useState("");
//   const [question11C, setQuestion11C] = useState("");
//   const [question12, setQuestion12] = useState("");
//   const [question13, setQuestion13] = useState("");
//   const [question14, setQuestion14] = useState("");
//   const [question15, setQuestion15] = useState("");
//   const [question16, setQuestion16] = useState("");
//   const [question17, setQuestion17] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleQuestionChange = (questionNumber: number) => (value: string) => {
//     setQuestions((prev) => {
//       const newQuestions = [...prev];
//       newQuestions[questionNumber - 1] = value;
//       return newQuestions;
//     });
//   };

//   const handleSubmit = async () => {
//     const updatedResponse = {
//       ...userResponse,
//       eventtype: "Step5PostTestFinish",
//       eventtime: getFormattedTimestamp(),
//       post_test: [
//         // Add questions 1-10 first
//         ...questionTexts.map((text, index) => ({
//           questionnum: index + 1,
//           question: text,
//           answer: questions[index],
//         })),
//       ],
//     };

//     setLoading(true);
//     console.log(updatedResponse);
//     // await submitResponse(updatedResponse);
//     setLoading(false);
//     onNext();
//   };

//   const questionTexts = [
//     "On a scale of 1 to 5, how would you rate your overall experience with the LLM tutor? ",
//     "On a scale of 1 to 5, how useful was the LLM tutor in helping you improve or structure your research study? ",
//     "Please elaborate on your response. In what ways did the LLM tutor help or fall short in supporting your research process? (Optional)",
//     "What did you like most about the LLM tutor’s assistance? (Optional)",
//     "What aspects of the LLM tutor’s assistance could be improved? (Optional)",
//   ];

//   return (
//     <div className="flex flex-col gap-2 items-start">
//       <p className="font-semibold text-2xl my-1">
//         Post-test: AI Design Research Self-Assessment
//       </p>
//       <p className="mb-0 text-lg">
//         Rate your agreement with the following statements:
//       </p>
//       {questionTexts.map((question, index) => (
//         <div key={index} className="m-1 w-full">
//           <p className="font-semibold text-lg my-2">
//             {index + 1}. {question}
//           </p>
//           {index === 0 ? ( // Question 1
//             <RadioGroup
//               orientation="horizontal"
//               value={questions[0]}
//               onValueChange={handleQuestionChange(1)}
//               isRequired // Mark as required
//             >
//               <Radio size="lg" value="Very Poor">
//                 <span className="text-lg">1 - Very Poor</span>
//               </Radio>
//               <Radio size="lg" value="Poor">
//                 <span className="text-lg">2 - Poor</span>
//               </Radio>
//               <Radio size="lg" value="Neutral">
//                 <span className="text-lg">3 - Neutral</span>
//               </Radio>
//               <Radio size="lg" value="Good">
//                 <span className="text-lg">4 - Good</span>
//               </Radio>
//               <Radio size="lg" value="Excellent">
//                 <span className="text-lg">5 - Excellent</span>
//               </Radio>
//             </RadioGroup>
//           ) : index === 1 ? ( // Question 2A
//             <RadioGroup
//               orientation="horizontal"
//               value={questions[1]}
//               onValueChange={handleQuestionChange(2)}
//               isRequired // Mark as required
//             >
//               <Radio size="lg" value="Not Useful at All">
//                 <span className="text-lg">1 - Not useful at all</span>
//               </Radio>
//               <Radio size="lg" value="Slightly Useful">
//                 <span className="text-lg">2 - Slightly useful</span>
//               </Radio>
//               <Radio size="lg" value="Moderately Useful">
//                 <span className="text-lg">3 - Moderately useful</span>
//               </Radio>
//               <Radio size="lg" value="Useful">
//                 <span className="text-lg">4 - Useful</span>
//               </Radio>
//               <Radio size="lg" value="Very Useful">
//                 <span className="text-lg">5 - Very useful</span>
//               </Radio>
//             </RadioGroup>
//           ) : (
//             // Questions 2B, 3, and 4 (Text Areas)
//             <Textarea
//               className="w-full text-lg"
//               placeholder="Type your answer here..."
//               value={
//                 [question12, question13, question14, question15][index - 2]
//               }
//               onValueChange={(value) =>
//                 [setQuestion12, setQuestion13, setQuestion14, setQuestion15][
//                   index - 2
//                 ](value)
//               }
//             />
//           )}
//         </div>
//       ))}

//       <Button
//         className="bg-blue-400 text-white font-medium gap-x-px mx-1"
//         onClick={handleSubmit}
//         disabled={loading || questions[0] === "" || questions[1] === ""} // Disable button if questions 1 or 2 are not answered
//       >
//         {loading ? "Submitting..." : "Submit Post-Test"}
//         <p className="material-symbols-outlined">chevron_right</p>
//       </Button>
//     </div>
//   );
// }

import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { UserResponseProps } from "./App";
import { submitResponse } from "./api";
import { getFormattedTimestamp } from "./helper function/timestamp";

interface Progress5Props {
  onNext: () => void;
  openingLine: string;
  prompts: string;
  userResponse: any;
  updateUserResponse: (updatedResponse: any) => void;
}

export default function Progress5({
  onNext,
  openingLine,
  prompts,
  userResponse,
  updateUserResponse,
}: Progress5Props) {
  const [questions, setQuestions] = useState(Array(4).fill(""));
  const [question2B, setQuestion2B] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // New state for error message

  const handleQuestionChange = (questionNumber: number) => (value: string) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[questionNumber - 1] = value;
      return newQuestions;
    });
  };

  const handleSubmit = async () => {
    if (questions[0] === "" || questions[1] === "") {
      // If required questions are not answered, show error message
      setError("Please fill in all required questions.");
      setTimeout(() => {
        setError("");
      }, 4000); // Hide the error after 4 seconds
      return;
    }

    const updatedResponse = {
      ...userResponse,
      eventtype: "Step5PostTestFinish",
      eventtime: getFormattedTimestamp(),
      post_test: [
        {
          questionnum: "1",
          question:
            "On a scale of 1 to 5, how would you rate your overall experience with the LLM tutor?",
          answer: questions[0],
        },
        {
          questionnum: "2A",
          question:
            "On a scale of 1 to 5, how useful was the LLM tutor in helping you improve or structure your research study?",
          answer: questions[1],
        },
        {
          questionnum: "2B",
          question:
            "Please elaborate on your response. In what ways did the LLM tutor help or fall short in supporting your research process? (Optional)",
          answer: question2B,
        },
        {
          questionnum: "3",
          question: "What did you like most about the LLM tutor’s assistance?",
          answer: questions[2],
        },
        {
          questionnum: "4",
          question:
            "What aspects of the LLM tutor’s assistance could be improved?",
          answer: questions[3],
        },
      ],
    };
    // console.log(updatedResponse);

    setLoading(true);
    await submitResponse(updatedResponse);
    setLoading(false);
    onNext();
  };

  const questionTexts = [
    "On a scale of 1 to 5, how would you rate your overall experience with the LLM tutor?",
    "On a scale of 1 to 5, how useful was the LLM tutor in helping you improve or structure your research study?",
    "Please elaborate on your response. In what ways did the LLM tutor help or fall short in supporting your research process? (Optional)",
    "What did you like most about the LLM tutor’s assistance? (Optional)",
    "What aspects of the LLM tutor’s assistance could be improved? (Optional)",
  ];

  return (
    <div className="flex flex-col gap-2 items-start">
      <p className="font-semibold text-2xl my-1">
        Post-test: AI Design Research Self-Assessment
      </p>
      <p className="mb-0 text-lg">
        Rate your agreement with the following statements:
      </p>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {questionTexts.map((question, index) => (
        <div key={index} className="m-1 w-full">
          {/* Render question 1 */}
          {index === 0 && (
            <>
              <p className="font-semibold text-lg my-2">
                {index + 1}. {question}
              </p>
              <RadioGroup
                orientation="horizontal"
                value={questions[0]}
                onValueChange={handleQuestionChange(1)}
                isRequired
              >
                <Radio size="lg" value="Very Poor">
                  <span className="text-lg">1 - Very Poor</span>
                </Radio>
                <Radio size="lg" value="Poor">
                  <span className="text-lg">2 - Poor</span>
                </Radio>
                <Radio size="lg" value="Neutral">
                  <span className="text-lg">3 - Neutral</span>
                </Radio>
                <Radio size="lg" value="Good">
                  <span className="text-lg">4 - Good</span>
                </Radio>
                <Radio size="lg" value="Excellent">
                  <span className="text-lg">5 - Excellent</span>
                </Radio>
              </RadioGroup>
            </>
          )}

          {/* Render question 2A and 2B */}
          {index === 1 && (
            <>
              <p className="font-semibold text-lg my-2.5">2A. {question}</p>
              <RadioGroup
                orientation="horizontal"
                value={questions[1]}
                onValueChange={handleQuestionChange(2)}
                isRequired
                className="mb-4"
              >
                <Radio size="lg" value="Not Useful at All">
                  <span className="text-lg">1 - Not useful at all</span>
                </Radio>
                <Radio size="lg" value="Slightly Useful">
                  <span className="text-lg">2 - Slightly useful</span>
                </Radio>
                <Radio size="lg" value="Moderately Useful">
                  <span className="text-lg">3 - Moderately useful</span>
                </Radio>
                <Radio size="lg" value="Useful">
                  <span className="text-lg">4 - Useful</span>
                </Radio>
                <Radio size="lg" value="Very Useful">
                  <span className="text-lg">5 - Very useful</span>
                </Radio>
              </RadioGroup>

              <p className="font-semibold text-lg mt-1 my-2">
                2B. {questionTexts[2]}
              </p>
              <Textarea
                className="w-full text-lg"
                placeholder="Type your answer here..."
                value={question2B}
                onValueChange={setQuestion2B}
                isRequired
              />
            </>
          )}

          {/* Render questions 3 and 4 */}
          {index >= 3 && (
            <>
              <p className="font-semibold text-lg my-2">
                {index}. {question}
              </p>
              <Textarea
                className="w-full text-lg"
                placeholder="Type your answer here..."
                value={questions[index - 1]} // Adjust the index correctly for questions 3 and 4
                onValueChange={handleQuestionChange(index)}
              />
            </>
          )}
        </div>
      ))}

      <Button
        className="bg-blue-400 text-white font-medium gap-x-px mx-1"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Post-Test"}
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
    </div>
  );
}
