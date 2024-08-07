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
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [shortAnswer, setShortAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuestion1Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion1(event.target.value);
  };

  const handleQuestion2Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion2(event.target.value);
  };

  const handleShortAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShortAnswer(event.target.value);
  };

  const handleSubmit = async () => {
    const updatedResponse1 = {
      ...userResponse,
      // post_question1: question1,
      // post_question2: question2,
      // post_shortAnswer: shortAnswer,
      // step_no: 5,
      eventtype: "Step5PostTestFinish",
      eventtime: getFormattedTimestamp(),
      questionNum: 1,
      question: `"We should make all public transportation free to reduce carbon emissions." Which assumption underlies this argument?`,
      answer: question1,
    };
    const updatedResponse2 = {
      ...userResponse,
      // pre_question1: question1,
      // pre_question2: question2,
      // pre_shortAnswer: shortAnswer,
      // step_no: 2,
      eventtype: "Step5PostTestFinish",
      eventtime: getFormattedTimestamp(),
      questionNum: 2,
      question: `"Violent video games should be banned because they lead to aggressive behavior." Which assumption is being made?`,
      answer: question2,
    };
    const updatedResponse3 = {
      ...userResponse,
      // pre_question1: question1,
      // pre_question2: question2,
      // pre_shortAnswer: shortAnswer,
      // step_no: 2,
      eventtype: "Step5PostTestFinish",
      eventtime: getFormattedTimestamp(),
      questionNum: 3,
      question: `Companies should allow employees to work from home because it increases productivity.`,
      answer: shortAnswer,
    };
    // updateUserResponse(updatedResponse1);
    setLoading(true);
    // await submitResponse(updatedResponse);
    // setLoading(false);
    console.log(updatedResponse1);
    // updateUserResponse(updatedResponse2);
    // await submitResponse(updatedResponse);
    console.log(updatedResponse2);
    // updateUserResponse(updatedResponse3);
    console.log(updatedResponse3);

    setLoading(false);
    onNext();
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      <p className="font-semibold text-xl m-1">
        Post-test: Identifying Underlying Assumptions
      </p>
      <div className="m-1">
        <p className="mb-2">
          Great job working with the AI tutor! Now, let&apos;s see how
          you&apos;ve improved. Answer the following questions:
        </p>
        <p className="font-semibold text-base mb-2">
          1. &quot;We should make all public transportation free to reduce
          carbon emissions.&quot; Which assumption underlies this argument?
        </p>
        <RadioGroup value={question1} onChange={handleQuestion1Change}>
          <Radio value="Public transportation is currently too expensive for most people.">
            Public transportation is currently too expensive for most people.
          </Radio>
          <Radio value="Making public transportation free will increase its use.">
            Making public transportation free will increase its use.
          </Radio>
          <Radio value="ICarbon emissions are solely caused by private transportation.">
            ICarbon emissions are solely caused by private transportation.
          </Radio>
          <Radio value="The cost of free public transportation is sustainable for the government.">
            The cost of free public transportation is sustainable for the
            government.
          </Radio>
        </RadioGroup>
      </div>
      <div className="m-2">
        <p className="font-semibold text-base mb-2">
          2. &quot;Violent video games should be banned because they lead to
          aggressive behavior.&quot; Which assumption is being made?
        </p>
        <RadioGroup value={question2} onChange={handleQuestion2Change}>
          <Radio value="All video games are violent.">
            All video games are violent.
          </Radio>
          <Radio value="Aggressive behavior is solely caused by violent video games.">
            Aggressive behavior is solely caused by violent video games.
          </Radio>
          <Radio value="There is a causal link between playing violent video games and aggressive behavior.">
            There is a causal link between playing violent video games and
            aggressive behavior.
          </Radio>
          <Radio value="Banning products is the most effective way to change behavior.">
            Banning products is the most effective way to change behavior.
          </Radio>
        </RadioGroup>
      </div>

      <div className="my-2 mx-1 flex flex-col gap-2">
        <p className="text-base">Short Answer Question: </p>
        <p>
          &quot;Companies should allow employees to work from home because it
          increases productivity.&quot;
        </p>
        <p>
          Identify one underlying assumption in this statement and briefly
          explain your reasoning.
        </p>
      </div>
      <Textarea
        className="my-2 mr-2"
        label="Type here..."
        value={shortAnswer}
        onChange={handleShortAnswerChange}
      />
      {loading ? (
        <Button className="bg-blue-400 text-white font-medium mx-1" isDisabled>
          Submit Post-Test
          <p className="material-symbols-outlined">chevron_right</p>
        </Button>
      ) : (
        <Button
          className="bg-blue-400 text-white font-medium mx-1"
          onClick={handleSubmit}
        >
          Submit Post-Test
          <p className="material-symbols-outlined">chevron_right</p>
        </Button>
      )}
      {/* <div className="flex flex-row my-2 mx-1">
        <span className="material-symbols-outlined">info</span>
        <p>Progress: 5/7</p>
      </div> */}
    </div>
  );
}
