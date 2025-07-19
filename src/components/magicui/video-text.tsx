"use client";

import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface VideoTextProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
}

export function VideoText({ src, children, className }: VideoTextProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black" />
      <div className="relative mix-blend-screen">{children}</div>
    </div>
  );
}
