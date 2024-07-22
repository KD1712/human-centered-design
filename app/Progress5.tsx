import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
interface Progress5Props {
  onNext: () => void;
}

export default function Progress5({ onNext }: Progress5Props) {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");

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
          {" "}
          Identify one underlying assumption in this statement and briefly
          explain your reasoning.
        </p>
      </div>
      <Textarea className="my-2 mr-2" label="Type here..." />
      <Button
        className="bg-blue-400 text-white font-medium mx-1"
        onClick={onNext}
      >
        Submit Post-Test
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
      {/* <div className="flex flex-row my-2 mx-1">
        <span className="material-symbols-outlined">info</span>
        <p>Progress: 5/7</p>
      </div> */}
    </div>
  );
}
