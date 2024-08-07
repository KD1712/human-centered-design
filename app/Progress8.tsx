import { Button, Pagination, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { UserResponseProps } from "./App";
import { submitResponse } from "./api";
import { getFormattedTimestamp } from "./helper function/timestamp";

interface Progress8Props {
  onNext: () => void;
  openingLine: string;
  prompts: string;
  userResponse: any;
  // updateUserResponse: (updatedResponse: Partial<UserResponseProps>) => void;
  updateUserResponse: (updatedResponse: any) => void;
}

export default function Progress8({
  onNext,
  openingLine,
  prompts,
  userResponse,
  updateUserResponse,
}: Progress8Props) {
  return (
    <div>
      <p>Thank You</p>
    </div>
  );
}
