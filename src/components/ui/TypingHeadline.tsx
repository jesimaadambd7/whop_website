"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TypingHeadlineProps = {
  text: string;
  className?: string;
  /** Milliseconds between characters */
  speed?: number;
  /** Delay before typing starts */
  startDelay?: number;
};

export function TypingHeadline({
  text,
  className,
  speed = 46,
  startDelay = 280,
}: TypingHeadlineProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(prefersReducedMotion ? text : "");
  const [isTyping, setIsTyping] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text);
      setIsTyping(false);
      return;
    }

    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setIsTyping(false);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay, prefersReducedMotion]);

  return (
    <span className={cn("inline", className)}>
      <span aria-hidden="true">{displayed}</span>
      <span
        aria-hidden="true"
        className={cn(
          "ml-1 inline-block w-[0.08em] min-w-[3px] translate-y-[0.06em] bg-sky-400 align-middle shadow-[0_0_12px_rgba(56,189,248,0.75)]",
          isTyping ? "opacity-100" : "animate-[caret-blink_1s_steps(1)_infinite]",
        )}
        style={{ height: "0.82em" }}
      />
    </span>
  );
}
