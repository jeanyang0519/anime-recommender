"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface FadeTextProps {
  html: string;
  clampLines?: number; // default is 5
}

export default function FadeText({ html, clampLines = 5 }: FadeTextProps) {
  const [lineClamp, setLineClamp] = useState(true);
  const [shouldTruncate, setShouldTruncate] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const height = descriptionRef.current.scrollHeight;
      setShouldTruncate(height > 0); // assumes any content may need truncation
    }
  }, [html]);

  return (
    <div className="relative mt-4 text-left text-base transition-all duration-300 ease-in-out">
      <div
        ref={descriptionRef}
        className={clsx(
            "transition-all duration-300 ease-in-out relative",
            lineClamp && "max-h-[8.5em] overflow-hidden fade-mask"
        )}
        >
        <div
            className="relative z-0"
            dangerouslySetInnerHTML={{ __html: html }}
        />
        </div>


      {shouldTruncate && (
        <div className="text-right mt-2 relative z-20">
          <button
            onClick={() => setLineClamp(!lineClamp)}
            className="read-more"
          >
            {lineClamp ? "Read more" : "Show less"}
          </button>
        </div>
      )}
    </div>
  );
}
