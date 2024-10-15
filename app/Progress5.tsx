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
  const [questions, setQuestions] = useState(Array(10).fill(""));
  const [question11A, setQuestion11A] = useState("");
  const [question11B, setQuestion11B] = useState("");
  const [question11C, setQuestion11C] = useState("");
  const [question12, setQuestion12] = useState("");
  const [question13, setQuestion13] = useState("");
  const [question14, setQuestion14] = useState("");
  const [question15, setQuestion15] = useState("");
  const [question16, setQuestion16] = useState("");
  const [question17, setQuestion17] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (questionNumber: number) => (value: string) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[questionNumber - 1] = value;
      return newQuestions;
    });
  };

  const handleSubmit = async () => {
    const updatedResponse = {
      ...userResponse,
      eventtype: "Step5PostTestFinish",
      eventtime: getFormattedTimestamp(),
      post_test: [
        // Add questions 1-10 first
        ...questionTexts.map((text, index) => ({
          questionnum: index + 1,
          question: text,
          answer: questions[index],
        })),
        // Then add questions 11-17
        {
          questionnum: 11,
          question:
            "List three research methods suitable for studying AI interactions:",
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
            "What was the most valuable insight you gained from this AI design research process?",
          answer: question13,
        },
        {
          questionnum: 14,
          question:
            "How has this process changed your approach to AI design research? Please explain:",
          answer: question14,
        },
        {
          questionnum: 15,
          question:
            "Describe a specific AI design challenge you now feel prepared to tackle:",
          answer: question15,
        },
        {
          questionnum: 16,
          question:
            "How likely are you to apply the knowledge gained from this process in future projects?",
          answer: question16,
        },
        {
          questionnum: 17,
          question:
            "What aspect of the AI design research process do you think will be most useful in your future work? Why?",
          answer: question17,
        },
      ],
    };

    setLoading(true);
    // console.log(updatedResponse);
    await submitResponse(updatedResponse);
    setLoading(false);
    onNext();
  };

  const questionTexts = [
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
  ];

  return (
    <div className="flex flex-col gap-2 items-start">
      <p className="font-semibold text-2xl my-1">
        Post-test: AI Design Research Self-Assessment
      </p>
      <p className="mb-2 text-lg">
        Rate your agreement with the following statements:
      </p>
      {questionTexts.map((question, index) => (
        <div key={index} className="m-1 w-full">
          <p className="font-semibold text-lg my-3">
            {index + 1}. {question}
          </p>
          <RadioGroup
            orientation="horizontal"
            value={questions[index]}
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
        </div>
      ))}

      {/* Question 11 */}
      <div className="m-1 w-full">
        <p className="font-semibold text-lg my-3">
          11. List three research methods suitable for studying AI interactions:
        </p>
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            placeholder="Method A"
            value={question11A}
            onChange={(e) => setQuestion11A(e.target.value)}
            className="w-full p-2 border rounded text-lg"
          />
          <input
            type="text"
            placeholder="Method B"
            value={question11B}
            onChange={(e) => setQuestion11B(e.target.value)}
            className="w-full p-2 border rounded text-lg"
          />
          <input
            type="text"
            placeholder="Method C"
            value={question11C}
            onChange={(e) => setQuestion11C(e.target.value)}
            className="w-full p-2 border rounded text-lg"
          />
        </div>
      </div>

      {/* Questions 12-15 */}
      {[
        "Briefly describe how you would approach translating research findings into AI design improvements:",
        "What was the most valuable insight you gained from this AI design research process?",
        "How has this process changed your approach to AI design research? Please explain:",
        "Describe a specific AI design challenge you now feel prepared to tackle:",
      ].map((question, index) => (
        <div key={index + 12} className="m-1 w-full">
          <p className="font-semibold text-lg my-3">
            {index + 12}. {question}
          </p>
          <Textarea
            className="w-full text-lg"
            placeholder="Type your answer here..."
            value={[question12, question13, question14, question15][index]}
            onValueChange={(value) =>
              [setQuestion12, setQuestion13, setQuestion14, setQuestion15][
                index
              ](value)
            }
          />
        </div>
      ))}

      {/* Question 16 */}
      <div className="m-1 w-full">
        <p className="font-semibold text-lg my-3">
          16. How likely are you to apply the knowledge gained from this process
          in future projects?
        </p>
        <RadioGroup
          orientation="horizontal"
          value={question16}
          onValueChange={setQuestion16}
        >
          <Radio size="lg" value="Very Unlikely">
            <span className="text-lg">1 (Very Unlikely)</span>
          </Radio>
          <Radio size="lg" value="Unlikely">
            <span className="text-lg">2 (Unlikely)</span>
          </Radio>
          <Radio size="lg" value="Neutral">
            <span className="text-lg">3 (Neutral)</span>
          </Radio>
          <Radio size="lg" value="Likely">
            <span className="text-lg">4 (Likely)</span>
          </Radio>
          <Radio size="lg" value="Very Likely">
            <span className="text-lg">5 (Very Likely)</span>
          </Radio>
        </RadioGroup>
      </div>

      {/* Question 17 */}
      <div className="m-1 w-full">
        <p className="font-semibold text-lg my-3">
          17. What aspect of the AI design research process do you think will be
          most useful in your future work? Why?
        </p>
        <Textarea
          className="w-full text-lg"
          placeholder="Type your answer here..."
          value={question17}
          onValueChange={setQuestion17}
        />
      </div>

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
