import React from "react";

export function SondLogo({ className = "w-5 h-5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* CAD outer locator target ring (semi-circle segments for technical blueprint aesthetic) */}
      <path d="M12 2a10 10 0 0 1 10 10" strokeDasharray="3 2" className="text-brand-blue/30" />
      <path d="M12 22a10 10 0 0 1-10-10" strokeDasharray="3 2" className="text-brand-blue/30" />
      
      {/* Forensic Trace 'S' constructed from signal pathways with micro node markers */}
      <path
        d="M17 7 H 12 C 10 7 8 8.5 8 10.5 C 8 12.5 10 13.5 12 13.5 H 13 C 15 13.5 17 14.5 17 16.5 C 17 18.5 15 20 12 20 H 7"
        className="text-brand-blue stroke-[2.5]"
      />
      
      {/* Node junction dots representing converging evidence */}
      <circle cx="17" cy="7" r="1.5" fill="currentColor" className="text-brand-blue" />
      <circle cx="7" cy="20" r="1.5" fill="currentColor" className="text-brand-blue" />
      
      {/* Crosshair precision ticks */}
      <line x1="12" y1="2" x2="12" y2="4" className="text-brand-blue" />
      <line x1="12" y1="20" x2="12" y2="22" className="text-brand-blue" />
      <line x1="2" y1="12" x2="4" y2="12" className="text-brand-blue" />
      <line x1="20" y1="12" x2="22" y2="12" className="text-brand-blue" />
    </svg>
  );
}
