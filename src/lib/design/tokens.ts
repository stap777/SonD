/**
 * Sond Design Tokens
 * Reusable system definitions for the Neo-brutalist / Retro Engineering workstation.
 * Configured as a single source of truth for design parameters.
 */
export const DESIGN_TOKENS = {
  colors: {
    // Theme Core
    blueprintBg: "#F7F4EF",      // Warm gridded drawing paper background
    blueprintBgDark: "#111215",  // Slate blueprint dark grid paper
    foreground: "#0D0E11",       // Dense black for high-contrast technical lines
    foregroundDark: "#F3F4F6",   // Warm grey text in dark mode
    border: "#000000",           // Absolute heavy black lines
    borderDark: "#F3F4F6",       // Sharp grid contrast line for dark modes
    
    // Status & Branding Accents
    brandBlue: "#0052CC",        // Engineering / Investigation Blue
    warningOrange: "#D97706",    // Warning Amber
    incidentRed: "#DC2626",      // Incident Crimson
    successGreen: "#16A34A",     // Terminal green
    mutedGrey: "#6B7280",        // technical metadata grey
    
    // Console Grid Colors
    gridLine: "rgba(0, 82, 204, 0.08)",
    gridLineDark: "rgba(243, 244, 246, 0.05)"
  },
  
  borders: {
    thin: "1px solid #000000",
    default: "2px solid #000000",
    heavy: "3px solid #000000",
    mega: "4px solid #000000",
    radius: "0px", // Classic sharp drafting borders (0px for pure neo-brutalist retroCAD)
  },
  
  shadows: {
    // Neo-brutalist solid offsets with no blur
    sm: "2px 2px 0px 0px #000000",
    default: "4px 4px 0px 0px #000000",
    lg: "6px 6px 0px 0px #000000",
    mega: "8px 8px 0px 0px #000000",
  },
  
  spacing: {
    xs: "0.25rem",  // 4px
    sm: "0.5rem",   // 8px
    md: "1rem",     // 16px
    lg: "1.5rem",   // 24px
    xl: "2rem",     // 32px
  },
  
  typography: {
    fontSans: "var(--font-inter)",
    fontMono: "var(--font-ibm-plex-mono)",
    fontTech: "var(--font-jetbrains-mono)",
    sizes: {
      xs: "0.75rem",    // 12px
      sm: "0.875rem",   // 14px
      md: "1rem",       // 16px
      lg: "1.25rem",     // 20px
      xl: "1.5rem",      // 24px
      xxl: "2rem",      // 32px
    }
  }
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;
