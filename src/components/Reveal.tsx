"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Fades content in on scroll, matching the entrance animation the original
 * site ships inline as `opacity:0; transform:translateY(30px)`.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  axis = "y",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  axis?: "x" | "y";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-axis={axis}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
