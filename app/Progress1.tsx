import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { submitResponse } from "./api";
import { getFormattedTimestamp } from "./helper function/timestamp";

interface Progress1Props {
  onNext: () => void;
  openingLine: string;
  prompts: string;
  userResponse: any;
  updateUserResponse: (updatedResponse: any) => void;
}

export default function Progress1({
  onNext,
  openingLine,
  prompts,
  userResponse,
  updateUserResponse,
}: Progress1Props) {
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [degreeProgram, setDegreeProgram] = useState("");
  const [priorExperience, setPriorExperience] = useState("");
  const [experienceDescription, setExperienceDescription] = useState("");

  useEffect(() => {
    // console.log(userResponse);

    const logInitialData = async () => {
      await submitResponse(userResponse);
    };
    logInitialData();
  }, []);

  const handleSubmit = async () => {
    const updatedResponse = {
      ...userResponse,
      eventtype: "Step1IntroFinish",
      eventtime: getFormattedTimestamp(),
      age: age,
      gender: gender,
      academicyear: academicYear,
      degreeprogram: degreeProgram,
      priorexperience: priorExperience,
      experiencedescription: experienceDescription,
    };
    updateUserResponse(updatedResponse);
    setLoading(true);
    await submitResponse(updatedResponse);
    setLoading(false);
    // console.log(updatedResponse);

    onNext();
  };

  return (
    <div className="flex flex-col gap-2 p-1 md:p-1 lg:p-1 w-full">
      <p className="font-semibold text-lg md:text-xl lg:text-2xl ">
        Welcome to the Human Centered Design Tutor
      </p>
      <div className="flex flex-col gap-4 text-sm md:text-base lg:text-lg">
        <div className="flex flex-col gap-2">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            className="border rounded p-1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            className="border rounded p-1"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="academicYear">Academic year:</label>
          <input
            type="text"
            id="academicYear"
            className="border rounded p-1"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="degreeProgram">
            What is your degree program called?
          </label>
          <input
            type="text"
            id="degreeProgram"
            className="border rounded p-1"
            value={degreeProgram}
            onChange={(e) => setDegreeProgram(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>
            Have you had any prior experience with AI design research?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="priorExperience"
                value="yes"
                className="mr-2"
                checked={priorExperience === "yes"}
                onChange={(e) => setPriorExperience(e.target.value)}
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="priorExperience"
                value="no"
                className="mr-2"
                checked={priorExperience === "no"}
                onChange={(e) => setPriorExperience(e.target.value)}
              />
              No
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="experienceDescription">
            If yes, briefly describe your experience:
          </label>
          <textarea
            id="experienceDescription"
            className="border rounded p-1"
            rows={3}
            value={experienceDescription}
            onChange={(e) => setExperienceDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="flex">
        {loading ? (
          <Button
            className="bg-blue-400 text-white font-medium gap-x-px md:mt-4 lg:mt-3"
            isDisabled
          >
            Start
            <p className="material-symbols-outlined">chevron_right</p>
          </Button>
        ) : (
          <Button
            className="bg-blue-400 text-white font-medium gap-x-px md:mt-4 lg:mt-3"
            onClick={handleSubmit}
          >
            Start
            <p className="material-symbols-outlined">chevron_right</p>
          </Button>
        )}
      </div>
    </div>
  );
}
