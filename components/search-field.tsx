"use client";

import { useRef } from "react";

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  /** Width and grid placement, set on the wrapper so the clear button stays inside the field. */
  className?: string;
};

/** A search box with a clear button once there's something to clear. Escape clears it too. */
export default function SearchField({ value, onChange, placeholder, label, className = "" }: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && value) {
            e.preventDefault();
            onChange("");
          }
        }}
        placeholder={placeholder}
        aria-label={label}
        className={`h-11 w-full rounded-field border border-line bg-raised pl-3.5 text-base outline-none focus:border-brand ${value ? "pr-11" : "pr-3.5"}`}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-faint transition-colors hover:bg-sunken hover:text-text"
        >
          <svg aria-hidden viewBox="0 0 12 12" className="size-3">
            <path d="M3 3l6 6M9 3l-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
