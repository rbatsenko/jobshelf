import type { ReactNode } from "react";

type Face = { icon: ReactNode; label: ReactNode };

const ease = "duration-300 ease-[cubic-bezier(0.2,0,0,1)]";

/**
 * Two faces of one control, stacked in a single grid cell: the wider sets the
 * size, so nothing reflows when they trade places. The faces cross-fade through
 * a light blur and the incoming icon grows from a quarter size. Both stay
 * mounted, so either direction animates and the first render doesn't.
 */
export default function Swap({ on, off, active }: { on: boolean; off: Face; active: Face }) {
  return (
    <span className="grid place-items-center">
      <Layer face={off} shown={!on} />
      <Layer face={active} shown={on} />
    </span>
  );
}

function Layer({ face, shown }: { face: Face; shown: boolean }) {
  return (
    <span
      aria-hidden={!shown}
      className={`inline-flex items-center gap-1.5 [grid-area:1/1] transition-[opacity,filter] ${ease} motion-reduce:blur-[0px] ${
        shown ? "opacity-100 blur-[0px]" : "opacity-0 blur-[4px]"
      }`}
    >
      <span className={`flex transition-[scale] ${ease} motion-reduce:scale-100 ${shown ? "scale-100" : "scale-[0.25]"}`}>
        {face.icon}
      </span>
      {face.label}
    </span>
  );
}
