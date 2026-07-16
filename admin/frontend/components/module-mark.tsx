import Image from "next/image";

export type MarkKind = string;

export function ModuleMark({ kind, size = 24, variant = "illustration" }: { kind: MarkKind; size?: number; variant?: "icon" | "illustration" }) {
  if (variant === "illustration") {
    return (
      <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Image 
          src={`/illustrations/illu_${kind}.png`}
          alt={`${kind} illustration`}
          width={size}
          height={size}
          style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
        />
      </div>
    );
  }

  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {kind === "dashboard" && <><path {...common} d="M4 5.5h6v5H4zM14 5.5h6v8h-6zM4 14.5h6v4H4zM14 16.5h6v2h-6z" /><circle cx="7" cy="8" r=".8" fill="currentColor" /></>}
      {kind === "students" && <><path {...common} d="M3.5 9.2 12 5l8.5 4.2L12 13.4 3.5 9.2Z" /><path {...common} d="M6.7 11.1v4.2c2.9 2.1 7.7 2.1 10.6 0v-4.2M20.5 9.2v5.2" /><circle cx="20.5" cy="16.2" r="1" fill="currentColor" /></>}
      {kind === "staff" && <><circle {...common} cx="9" cy="8" r="3" /><path {...common} d="M3.8 18.5c.4-3.1 2.1-4.7 5.2-4.7s4.8 1.6 5.2 4.7" /><path {...common} d="M16 7.5h4M18 5.5v4M16.3 13h3.9v5.5h-3.9z" /></>}
      {kind === "attendance" && <><path {...common} d="M5 4.5h11.5a2 2 0 0 1 2 2V11M5 4.5v15h7" /><path {...common} d="M8 9h6M8 12h4" /><circle {...common} cx="17" cy="16.5" r="4" /><path {...common} d="m15.4 16.5 1.1 1.1 2.2-2.4" /></>}
      {kind === "leave" && <><path {...common} d="M5 6.5h14v13H5zM8 4v5M16 4v5M5 10h14" /><path {...common} d="m9 15 2 2 4-4" /></>}
      {kind === "fees" && <><path {...common} d="M5 4.5h11l3 3v12H5zM16 4.5v3h3" /><path {...common} d="M9 10.5h6M9 14.5h6M11 9v7" /></>}
      {kind === "communication" && <><path {...common} d="M4 5.5h16v11H9l-5 3v-14Z" /><path {...common} d="M8 9h8M8 12.5h5" /></>}
      {kind === "holidays" && <><circle {...common} cx="12" cy="12" r="3.3" /><path {...common} d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" /></>}
      {kind === "timetable" && <><path {...common} d="M4 5.5h16v14H4zM8 5.5v14M4 10h16M4 14.5h16M14.5 10v9.5" /><path {...common} d="M11 8h6" /></>}
      {kind === "exams" && <><path {...common} d="M7 4.5h10v15H7zM9.5 8h5M9.5 11h5" /><path {...common} d="m10 15 1.3 1.3 3-3" /></>}
      {kind === "settings" && <><circle {...common} cx="12" cy="12" r="3" /><path {...common} d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18" /></>}
    </svg>
  );
}
