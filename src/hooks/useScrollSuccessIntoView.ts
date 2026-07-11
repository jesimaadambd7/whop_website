"use client";

import { useLayoutEffect, type RefObject } from "react";

type ScrollSuccessOptions = {
  /** Stable wrapper that stays mounted during the form → success swap */
  containerRef?: RefObject<HTMLElement | null>;
  /** Success element ref — may mount after AnimatePresence exit */
  successRef?: RefObject<HTMLElement | null>;
  /** Optional page anchor id (e.g. application-form on careers) */
  targetId?: string;
  /** Wait for exit animations before the final scroll/focus pass */
  waitMs?: number;
};

function resolveTarget(
  containerRef?: RefObject<HTMLElement | null>,
  successRef?: RefObject<HTMLElement | null>,
  targetId?: string,
) {
  if (successRef?.current) return successRef.current;
  if (containerRef?.current) return containerRef.current;
  if (targetId) return document.getElementById(targetId);
  return null;
}

export function useScrollSuccessIntoView(
  active: boolean,
  { containerRef, successRef, targetId, waitMs = 400 }: ScrollSuccessOptions = {},
) {
  useLayoutEffect(() => {
    if (!active) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reducedMotion ? 0 : waitMs;

    const scrollToTarget = (behavior: ScrollBehavior) => {
      const target = resolveTarget(containerRef, successRef, targetId);
      if (!target) return;

      target.scrollIntoView({ behavior, block: "center" });
    };

    // Jump immediately so the viewport is not left on the footer during the swap
    scrollToTarget("instant");

    const timer = window.setTimeout(() => {
      scrollToTarget(reducedMotion ? "auto" : "smooth");
      successRef?.current?.focus({ preventScroll: true });
    }, delay);

    return () => window.clearTimeout(timer);
  }, [active, containerRef, successRef, targetId, waitMs]);
}
