"use client";
import { NextUIProvider } from "@nextui-org/react";
import Image from "next/image";
import App from "./App";

export default function Home() {
  return (
    <NextUIProvider>
      <div className="flex flex-col items-center justify-center align-middle min-w-screen min-h-screen p-1">
        <App />
      </div>
    </NextUIProvider>
  );
}
