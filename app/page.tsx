"use client";
import { NextUIProvider } from "@nextui-org/react";
import Image from "next/image";
import App from "./App";

export default function Home() {
  return (
    <NextUIProvider>
      <App />
    </NextUIProvider>
  );
}
