"use client";

import { useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";
const KEY = "job-tracker:theme";

/**
 * Every transition is off for the flip, or each colour fades on its own clock and
 * the switch smears. Reading offsetHeight commits the new colours while the
 * override is in; it comes out after the next paint.
 */
const apply = (t: Theme) => {
  const dark = t === "dark" || (t === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  const freeze = document.createElement("style");
  freeze.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.append(freeze);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  void document.body.offsetHeight;
  requestAnimationFrame(() => requestAnimationFrame(() => freeze.remove()));
};

const icon = (children: ReactNode) => (
  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {children}
  </svg>
);

const ICONS: Record<Theme, ReactNode> = {
  light: icon(
    <>
      <circle cx="8" cy="8" r="2.75" />
      <path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.06 1.06M11.54 11.54l1.06 1.06M3.4 12.6l1.06-1.06M11.54 4.46l1.06-1.06" />
    </>,
  ),
  system: icon(
    <>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M8 2.25a5.75 5.75 0 0 0 0 11.5Z" fill="currentColor" />
    </>,
  ),
  dark: icon(<path d="M13.25 9.6A5.5 5.5 0 0 1 6.4 2.75a5.5 5.5 0 1 0 6.85 6.85Z" />),
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = (): Theme => {
      try {
        return (localStorage.getItem(KEY) as Theme) ?? "system";
      } catch {
        return "system";
      }
    };
    setTheme(stored());

    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (stored() === "system") apply("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const choose = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {}
    apply(t);
  };

  const options: { value: Theme; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "system", label: "System" },
    { value: "dark", label: "Dark" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className="flex items-center gap-0.5 rounded-field border border-line bg-sunken p-1"
    >
      {options.map((o) => (
        <button
          key={o.value}
          role="radio"
          aria-checked={theme === o.value}
          title={o.label}
          onClick={() => choose(o.value)}
          // 5px inside the 4px inset and 1px border keeps the corners concentric with the 10px group.
          className={`flex h-8 w-9 items-center justify-center rounded-[5px] transition-[color,background-color,box-shadow] duration-150 ${
            theme === o.value
              ? "bg-raised text-text shadow-sm"
              : "text-faint hover:text-soft"
          }`}
        >
          {ICONS[o.value]}
          <span className="sr-only">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
