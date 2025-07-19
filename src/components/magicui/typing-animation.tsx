"use client";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function TypingAnimation({
  parts,
  containerClassName,
  cursorClassName,
  duration = 2000,
}: {
  parts: { text: string; className?: string }[];
  containerClassName?: string;
  cursorClassName?: string;
  duration?: number;
}) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const fullText = parts.map((p) => p.text).join("");

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      if (isDeleting) {
        if (text.length > 0) {
          setText((prev) => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
        }
      } else {
        if (text.length < fullText.length) {
          setText(fullText.slice(0, text.length + 1));
        } else {
          // Finished typing, schedule deletion
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, duration);
        }
      }
    };

    // If we are at a pause state (fully typed), we don't need a character-by-character timeout
    if (!(!isDeleting && text === fullText)) {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(handleTyping, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, fullText, duration, parts, hasStarted]);

  const getDisplayedParts = () => {
    let currentText = text;
    return parts.map((part) => {
      const partLength = part.text.length;
      const displayedPartText = currentText.substring(0, partLength);
      currentText = currentText.substring(partLength);
      return { ...part, text: displayedPartText };
    });
  };

  const displayedParts = getDisplayedParts();

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-baseline justify-center",
        containerClassName,
      )}
    >
      {displayedParts.map((part, index) => (
        <span key={index} className={cn(part.className, "whitespace-pre")}>
          {part.text}
        </span>
      ))}
      <motion.span
        key="cursor"
        initial={{ opacity: 1 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className={cn(
          "ml-1 inline-block h-[1.1em] w-[2px] translate-y-1 bg-foreground",
          cursorClassName,
        )}
      />
    </div>
  );
}
