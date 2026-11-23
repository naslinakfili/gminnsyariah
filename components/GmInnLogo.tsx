import React from "react";

interface GmInnLogoProps {
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
}

/**
 * Clean vector recreation of the GM Inn Syariah emblem and wordmark
 * inspired by the property's main facade signage.
 */
export function GmInnLogo({
  variant = "dark",
  compact = false,
  className = "",
}: GmInnLogoProps) {
  const emblemColor = variant === "light" ? "#FFFFFF" : "#0C7B85";
  const textColor = variant === "light" ? "#FFFFFF" : "#1B2223";
  const subColor = variant === "light" ? "#A3B5B7" : "#505D5E";

  return (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        width={compact ? 36 : 42}
        height={compact ? 36 : 42}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* 6 symmetrical stylized floral / starburst arms matching the GM Inn sign */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 60 60)`}>
            <path
              d="M60 7C64.5 7 67.2 12.5 67.8 18.2C70.6 15.8 75.5 14.8 77.6 18.2C79.7 21.6 76.2 26.8 71.2 29.8L68.5 34.8L51.5 34.8L48.8 29.8C43.8 26.8 40.3 21.6 42.4 18.2C44.5 14.8 49.4 15.8 52.2 18.2C52.8 12.5 55.5 7 60 7Z"
              fill={emblemColor}
            />
            <path
              d="M54.5 32.5H65.5L67.5 38.5H52.5L54.5 32.5Z"
              fill={emblemColor}
            />
          </g>
        ))}

        {/* Inner dark/light core spacer */}
        <circle
          cx="60"
          cy="60"
          r="24.5"
          fill={variant === "light" ? "#182021" : "#FAFAF7"}
        />

        {/* Hexagonal G outer frame */}
        <path
          d="M60 39.5L77.5 49.5V56.2H71.8V52.8L60 46L48.2 52.8V67.2L60 74L71.8 67.2V62.5H64.8V57.5H77.5V70.5L60 80.5L42.5 70.5V49.5L60 39.5Z"
          fill={emblemColor}
        />

        {/* Inner M monogram pillars */}
        <path
          d="M52.5 67.5V55.2L60 60.2L67.5 55.2V67.5H63.2V62.1L60 64.2L56.8 62.1V67.5H52.5Z"
          fill={emblemColor}
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className="text-[19px] tracking-tight font-bold flex items-baseline gap-1"
          style={{ color: textColor }}
        >
          <span className="font-bold tracking-tight">GM</span>
          <span className="font-medium tracking-normal">inn</span>
        </span>
        {!compact && (
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.22em] mt-1"
            style={{ color: subColor }}
          >
            Syariah · Banda Aceh
          </span>
        )}
      </span>
    </span>
  );
}
