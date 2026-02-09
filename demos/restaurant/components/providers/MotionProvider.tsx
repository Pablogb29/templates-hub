"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wraps the app in framer-motion's MotionConfig with
 * `reducedMotion="user"` so every `motion.*` component
 * automatically respects `prefers-reduced-motion: reduce`.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
