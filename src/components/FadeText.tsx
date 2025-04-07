"use client";

import { useEffect, useRef, useState } from "react";

interface FadeTextProps {
  html: string;
  maxHeight?: number; // default: 180px
}

export default function FadeText({ html, maxHeight = 180 }: FadeTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [shouldTruncate, setShouldTruncate] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const height = descriptionRef.current.scrollHeight;
      setShouldTruncate(height > maxHeight);
    }
  }, [html, maxHeight]);

  return (
    <div className="relative mt-4 text-left text-base transition-all duration-300 ease-in-out">
      <div
        ref={descriptionRef}
        className={`transition-all duration-300 ease-in-out relative ${
          expanded ? "max-h-full" : `max-h-[${maxHeight}px] overflow-hidden`
        }`}
      >
        <div
          className="relative z-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {!expanded && shouldTruncate && (
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        )}
      </div>

      {shouldTruncate && (
        <div className="text-right mt-2 relative z-20">
          <button
            onClick={() => setExpanded(!expanded)}
            className="read-more"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>
      )}
    </div>
  );
}
