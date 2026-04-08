"use client";

import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FadeInViewProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  once?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function FadeInView<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  threshold = 0.15,
  once = true,
  ...rest
}: FadeInViewProps<T>) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const node = ref.current;
    let frameId = 0;
    let timeoutId: number | undefined;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frameId = window.requestAnimationFrame(() => {
            timeoutId = window.setTimeout(() => {
              setVisible(true);
            }, 40);
          });

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [once, threshold]);

  return (
    <Tag
      ref={ref}
      className={cn("fade-in-view", visible && "is-visible", className)}
      style={{ "--fade-delay": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
