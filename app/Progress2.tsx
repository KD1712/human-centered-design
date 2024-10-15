import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { UserResponseProps } from "./App";
import { submitResponse } from "./api";
import { getFormattedTimestamp } from "./helper function/timestamp";

interface Progress2Props {
  onNext: () => void;
  openingLine: string;
  prompts: string;
  userResponse: any;
  updateUserResponse: (updatedResponse: any) => void;
}

export default function Progress2({
  onNext,
  openingLine,
  prompts,
  userResponse,
  updateUserResponse,
}: Progress2Props) {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");
  const [question6, setQuestion6] = useState("");
  const [question7, setQuestion7] = useState("");
  const [question8, setQuestion8] = useState("");
  const [question9, setQuestion9] = useState("");
  const [question10, setQuestion10] = useState("");
  const [shortAnswer, setShortAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [question11A, setQuestion11A] = useState("");
  const [question11B, setQuestion11B] = useState("");
  const [question11C, setQuestion11C] = useState("");
  const [question12, setQuestion12] = useState("");
  const [question13, setQuestion13] = useState("");

  const handleQuestionChange = (questionNumber: number) => (value: string) => {
    const setters = [
      setQuestion1,
      setQuestion2,
      setQuestion3,
      setQuestion4,
      setQuestion5,
      setQuestion6,
      setQuestion7,
      setQuestion8,
      setQuestion9,
      setQuestion10,
    ];
    setters[questionNumber - 1](value);
  };

  const handleShortAnswerChange = (value: string) => {
    setShortAnswer(value);
  };

  const handleSubmit = async () => {
    const updatedResponse = {
      ...userResponse,
      eventtype: "Step2PreTestFinish",
      eventtime: getFormattedTimestamp(),
      pre_test: [
        {
          questionnum: 1,
          question:
            "I feel confident in my ability to conduct design research on AI interactions.",
          answer: question1,
        },
        {
          questionnum: 2,
          question:
            "I am motivated to pursue projects involving AI and design.",
          answer: question2,
        },
        {
          questionnum: 3,
          question:
            "I can identify appropriate research methods for investigating human-AI interactions.",
          answer: question3,
        },
        {
          questionnum: 4,
          question:
            "I can formulate relevant research questions in the field of generative AI.",
          answer: question4,
        },
        {
          questionnum: 5,
          question:
            "I understand the ethical implications of AI research and design.",
          answer: question5,
        },
        {
          questionnum: 6,
          question:
            "I feel prepared to analyze data collected from AI interaction studies.",
          answer: question6,
        },
        {
          questionnum: 7,
          question:
            "I can translate research findings into actionable design improvements for AI systems.",
          answer: question7,
        },
        {
          questionnum: 8,
          question:
            "I feel confident in my ability to plan a comprehensive AI interaction research project.",
          answer: question8,
        },
        {
          questionnum: 9,
          question:
            "I understand how to create effective user personas for AI research.",
          answer: question9,
        },
        {
          questionnum: 10,
          question:
            "Rate your overall knowledge of the AI design research process:",
          answer: question10,
        },
        {
          questionnum: 11,
          question: "List three key challenges in AI design research:",
          answerA: question11A,
          answerB: question11B,
          answerC: question11C,
        },
        {
          questionnum: 12,
          question:
            "Briefly describe how you would approach translating research findings into AI design improvements:",
          answer: question12,
        },
        {
          questionnum: 13,
          question:
            "What do you hope to gain from this AI design research process?",
          answer: question13,
        },
      ],
      shortAnswer: {
        questionnum: 14,
        question:
          "The government should lower the voting age to 16 because young people are affected by political decisions.",
        answer: shortAnswer,
      },
    };

    setLoading(true);
    // console.log(updatedResponse);
    await submitResponse(updatedResponse);
    setLoading(false);
    onNext();
  };

  const questions = [
    "I feel confident in my ability to conduct design research on AI interactions.",
    "I am motivated to pursue projects involving AI and design.",
    "I can identify appropriate research methods for investigating human-AI interactions.",
    "I can formulate relevant research questions in the field of generative AI.",
    "I understand the ethical implications of AI research and design.",
    "I feel prepared to analyze data collected from AI interaction studies.",
    "I can translate research findings into actionable design improvements for AI systems.",
    "I feel confident in my ability to plan a comprehensive AI interaction research project.",
    "I understand how to create effective user personas for AI research.",
    "Rate your overall knowledge of the AI design research process:",
    "List three key challenges in AI design research:",
  ];

  return (
    <div className="flex flex-col gap-2 items-start">
      <p className="font-semibold text-2xl m-1">
        Pre-test: AI Design Research Self-Assessment
      </p>
      <p className="mb-2 text-lg">
        Rate your agreement with the following statements:
      </p>
      {questions.map((question, index) => (
        <div key={index} className="m-1 w-full">
          <p className="font-semibold text-lg my-3">
            {index + 1}. {question}
          </p>
          {index === 10 ? (
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                placeholder="Challenge A"
                value={question11A}
                onChange={(e) => setQuestion11A(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Challenge B"
                value={question11B}
                onChange={(e) => setQuestion11B(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Challenge C"
                value={question11C}
                onChange={(e) => setQuestion11C(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          ) : (
            <RadioGroup
              orientation="horizontal"
              value={
                [
                  question1,
                  question2,
                  question3,
                  question4,
                  question5,
                  question6,
                  question7,
                  question8,
                  question9,
                  question10,
                ][index]
              }
              onValueChange={handleQuestionChange(index + 1)}
            >
              {index === 9 ? ( // Question 10
                <>
                  <Radio size="lg" value="Very Low">
                    <span className="text-lg">1 (Very Low)</span>
                  </Radio>
                  <Radio size="lg" value="Low">
                    <span className="text-lg">2 (Low)</span>
                  </Radio>
                  <Radio size="lg" value="Moderate">
                    <span className="text-lg">3 (Moderate)</span>
                  </Radio>
                  <Radio size="lg" value="High">
                    <span className="text-lg">4 (High)</span>
                  </Radio>
                  <Radio size="lg" value="Very High">
                    <span className="text-lg">5 (Very High)</span>
                  </Radio>
                </>
              ) : (
                // Questions 1-9
                <>
                  <Radio size="lg" value="Strongly Disagree">
                    <span className="text-lg">1 (Strongly Disagree)</span>
                  </Radio>
                  <Radio size="lg" value="Disagree">
                    <span className="text-lg">2 (Disagree)</span>
                  </Radio>
                  <Radio size="lg" value="Neutral">
                    <span className="text-lg">3 (Neutral)</span>
                  </Radio>
                  <Radio size="lg" value="Agree">
                    <span className="text-lg">4 (Agree)</span>
                  </Radio>
                  <Radio size="lg" value="Strongly Agree">
                    <span className="text-lg">5 (Strongly Agree)</span>
                  </Radio>
                </>
              )}
            </RadioGroup>
          )}
        </div>
      ))}

      <div className="m-1 w-full">
        <p className="font-semibold text-lg mb-2">
          12. Briefly describe how you would approach translating research
          findings into AI design improvements:
        </p>
        <Textarea
          className="w-full"
          placeholder="Type your answer here..."
          value={question12}
          onValueChange={setQuestion12}
        />
      </div>

      <div className="m-1 w-full">
        <p className="font-semibold text-lg mb-2">
          13. What do you hope to gain from this AI design research process?
        </p>
        <Textarea
          className="w-full"
          placeholder="Type your answer here..."
          value={question13}
          onValueChange={setQuestion13}
        />
      </div>

      <Button
        className="bg-blue-400 text-white font-medium gap-x-px mx-1"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Pre-Test"}
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
    </div>
  );
}
