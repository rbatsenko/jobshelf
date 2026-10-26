export const input =
  "h-11 w-full rounded-field border border-line bg-bg px-3.5 text-base outline-none focus:border-brand";

export const textarea =
  "w-full resize-y rounded-field border border-line bg-bg p-3.5 text-base leading-relaxed outline-none focus:border-brand";

export const label = "mb-1.5 block text-sm font-medium text-soft";

export const card = "rounded-card border border-line bg-raised shadow-[var(--shadow)]";

/** A pressed button gives a little, unless it's disabled or the viewer prefers less motion. */
export const press = "motion-safe:not-disabled:active:scale-[0.96]";

/** Colour changes and the press, named so nothing else ever animates. */
export const buttonMotion = `transition-[color,background-color,border-color,filter,scale] duration-150 ease-out ${press}`;

const button = `h-11 whitespace-nowrap rounded-field disabled:opacity-50 ${buttonMotion}`;

export const primaryButton = `${button} bg-brand px-5 text-base font-semibold text-brand-text hover:brightness-110`;

export const secondaryButton = `${button} border border-line px-4 text-base font-medium text-soft hover:bg-sunken hover:text-text`;
