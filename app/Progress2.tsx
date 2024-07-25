// import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
// import { useState } from "react";
// import { UserResponseProps } from "./App";

// interface Progress2Props {
//   onNext: () => void;

//   openingLine: string;
//   prompts: string;
//   userResponse: UserResponseProps;
// }

// export default function Progress2({
//   onNext,
//   openingLine,
//   prompts,
//   userResponse,
// }: Progress2Props) {
//   const [question1, setQuestion1] = useState("");
//   const [question2, setQuestion2] = useState("");
//   const [shortAnswer, setShortAnswer] = useState("");

//   const handleQuestion1Change = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setQuestion1(event.target.value);
//   };

//   const handleQuestion2Change = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setQuestion2(event.target.value);
//   };

//   const handleShortAnswerChange = (value: string) => {
//     setShortAnswer(value);
//   };

//   const handleSubmit = () => {
//     // const data = {
//     //   question1,
//     //   question2,
//     //   shortAnswer,
//     //   response_type: "pre-test",
//     //   step_no: 2,
//     //   sessionid: sessionid,
//     // };
//     // console.log(data);
//     console.log(userResponse);

//     onNext();
//   };

//   return (
//     <div className="flex flex-col gap-2 items-start">
//       <p className="font-semibold text-xl m-1">
//         Pre-test: Identifying Underlying Assumptions
//       </p>
//       <div className="m-1">
//         <p className="mb-2">
//           Answer the following questions to the best of your ability. Don&apos;t
//           worry if you&apos;re not sure - this is just to establish a starting
//           point.
//         </p>
//         <p className="font-semibold text-base mb-2">
//           1. &quot;We should invest more in renewable energy because it will
//           create jobs.&quot; Which assumption underlies this argument?
//         </p>
//         <RadioGroup value={question1} onChange={handleQuestion1Change}>
//           <Radio value="Renewable energy is more efficient than other energy sources.">
//             Renewable energy is more efficient than other energy sources.
//           </Radio>
//           <Radio value="Job creation is the most important factor in energy policy.">
//             Job creation is the most important factor in energy policy.
//           </Radio>
//           <Radio value="Investment in renewable energy will lead to job creation.">
//             Investment in renewable energy will lead to job creation.
//           </Radio>
//           <Radio value="There are currently not enough jobs in the energy sector.">
//             There are currently not enough jobs in the energy sector.
//           </Radio>
//         </RadioGroup>
//       </div>

//       <div className="m-2 ">
//         <p className="font-semibold text-base mb-2">
//           2. &quot;Students who eat breakfast perform better in school, so all
//           schools should provide free breakfast.&quot; Which assumption is being
//           made?
//         </p>
//         <RadioGroup value={question2} onChange={handleQuestion2Change}>
//           <Radio value="All students will eat the provided breakfast.">
//             All students will eat the provided breakfast.
//           </Radio>
//           <Radio value="Better school performance is solely dependent on eating breakfast.">
//             Better school performance is solely dependent on eating breakfast.
//           </Radio>
//           <Radio value="Schools currently do not provide breakfast.">
//             Schools currently do not provide breakfast.
//           </Radio>
//           <Radio value=" Providing free breakfast will not be a financial burden on schools.">
//             Providing free breakfast will not be a financial burden on schools.
//           </Radio>
//         </RadioGroup>
//       </div>

//       <div className="my-2 mx-1 flex flex-col gap-2">
//         <p className="text-base ">Short Answer Question:</p>
//         <p>
//           &quot;The government should lower the voting age to 16 because young
//           people are affected by political decisions.&quot;
//         </p>{" "}
//         <p>
//           Identify one underlying assumption in this statement and briefly
//           explain your reasoning.
//         </p>
//       </div>
//       <Textarea
//         className="my-2 mr-2"
//         label="Type here..."
//         value={shortAnswer}
//         onValueChange={handleShortAnswerChange}
//       />
//       <Button
//         className="bg-blue-400 text-white font-medium gap-x-px mx-1"
//         onClick={handleSubmit}
//       >
//         Submit Pre-Test
//         <p className="material-symbols-outlined">chevron_right</p>
//       </Button>
//       {/* <div className="flex flex-row my-2 mx-1">
//         <span className="material-symbols-outlined">info</span>
//         <p>Progress: 2/7</p>
//       </div> */}
//     </div>
//   );
// }

import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { UserResponseProps } from "./App";

interface Progress2Props {
  onNext: () => void;
  openingLine: string;
  prompts: string;
  userResponse: UserResponseProps;
  updateUserResponse: (updatedResponse: Partial<UserResponseProps>) => void;
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
  const [shortAnswer, setShortAnswer] = useState("");

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

  const handleShortAnswerChange = (value: string) => {
    setShortAnswer(value);
  };

  const handleSubmit = () => {
    const updatedResponse = {
      ...userResponse,
      pre_question1: question1,
      pre_question2: question2,
      pre_shortAnswer: shortAnswer,
      step_no: 2,
    };
    updateUserResponse(updatedResponse);
    console.log(updatedResponse);

    onNext();
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      <p className="font-semibold text-xl m-1">
        Pre-test: Identifying Underlying Assumptions
      </p>
      <div className="m-1">
        <p className="mb-2">
          Answer the following questions to the best of your ability. Don&apos;t
          worry if you&apos;re not sure - this is just to establish a starting
          point.
        </p>
        <p className="font-semibold text-base mb-2">
          1. &quot;We should invest more in renewable energy because it will
          create jobs.&quot; Which assumption underlies this argument?
        </p>
        <RadioGroup value={question1} onChange={handleQuestion1Change}>
          <Radio value="Renewable energy is more efficient than other energy sources.">
            Renewable energy is more efficient than other energy sources.
          </Radio>
          <Radio value="Job creation is the most important factor in energy policy.">
            Job creation is the most important factor in energy policy.
          </Radio>
          <Radio value="Investment in renewable energy will lead to job creation.">
            Investment in renewable energy will lead to job creation.
          </Radio>
          <Radio value="There are currently not enough jobs in the energy sector.">
            There are currently not enough jobs in the energy sector.
          </Radio>
        </RadioGroup>
      </div>

      <div className="m-2 ">
        <p className="font-semibold text-base mb-2">
          2. &quot;Students who eat breakfast perform better in school, so all
          schools should provide free breakfast.&quot; Which assumption is being
          made?
        </p>
        <RadioGroup value={question2} onChange={handleQuestion2Change}>
          <Radio value="All students will eat the provided breakfast.">
            All students will eat the provided breakfast.
          </Radio>
          <Radio value="Better school performance is solely dependent on eating breakfast.">
            Better school performance is solely dependent on eating breakfast.
          </Radio>
          <Radio value="Schools currently do not provide breakfast.">
            Schools currently do not provide breakfast.
          </Radio>
          <Radio value=" Providing free breakfast will not be a financial burden on schools.">
            Providing free breakfast will not be a financial burden on schools.
          </Radio>
        </RadioGroup>
      </div>

      <div className="my-2 mx-1 flex flex-col gap-2">
        <p className="text-base ">Short Answer Question:</p>
        <p>
          &quot;The government should lower the voting age to 16 because young
          people are affected by political decisions.&quot;
        </p>{" "}
        <p>
          Identify one underlying assumption in this statement and briefly
          explain your reasoning.
        </p>
      </div>
      <Textarea
        className="my-2 mr-2"
        label="Type here..."
        value={shortAnswer}
        onValueChange={handleShortAnswerChange}
      />
      <Button
        className="bg-blue-400 text-white font-medium gap-x-px mx-1"
        onClick={handleSubmit}
      >
        Submit Pre-Test
        <p className="material-symbols-outlined">chevron_right</p>
      </Button>
      {/* <div className="flex flex-row my-2 mx-1">
        <span className="material-symbols-outlined">info</span>
        <p>Progress: 2/7</p>
      </div> */}
    </div>
  );
}
