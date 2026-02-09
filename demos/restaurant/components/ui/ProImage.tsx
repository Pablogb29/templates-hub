"use client";

/**
 * PRO: Image component with blur placeholder loading effect.
 *
 * Wraps Next.js Image with a smooth blur-to-sharp transition.
 * Shows a shimmer placeholder while loading, then fades in sharp.
 */

import { useState, useCallback } from "react";
import Image, { type ImageProps } from "next/image";

interface ProImageProps extends Omit<ImageProps, "onLoad"> {
  /** Optional blur data URL for instant placeholder */
  blurDataURL?: string;
}

export default function ProImage({
  className = "",
  blurDataURL,
  ...props
}: ProImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`img-blur-load relative overflow-hidden ${className}`}>
      <Image
        {...props}
        className={`transition-all duration-700 ease-out ${
          loaded ? "scale-100 blur-0 opacity-100" : "scale-105 blur-lg opacity-60"
        }`}
        onLoad={handleLoad}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        data-loaded={loaded}
      />
    </div>
  );
}
