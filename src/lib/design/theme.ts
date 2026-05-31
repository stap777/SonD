
/**
 * Technical Theme Utility Mappings
 * Aids components in cleanly referencing visual styles.
 */
export const THEME_UTILITIES = {
  // Heavy black borders
  borders: {
    thin: "border border-black dark:border-zinc-800",
    default: "border-2 border-black dark:border-zinc-100",
    heavy: "border-3 border-black dark:border-zinc-100",
    mega: "border-4 border-black dark:border-zinc-100",
  },

  // Hard non-blurry neo-brutalist shadows
  shadows: {
    sm: "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]",
    default: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
    lg: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]",
    mega: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]",
  },

  // Interactive hover classes (e.g. clicky workstation buttons)
  interactive: {
    button: "active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all",
    card: "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all",
  },

  // Technical color state mappings (Warning, Incident, Success, Core)
  states: {
    info: {
      bg: "bg-brandBlue/10 dark:bg-brandBlue/20",
      text: "text-brandBlue dark:text-blue-400",
      border: "border-brandBlue",
    },
    warning: {
      bg: "bg-warningOrange/10 dark:bg-warningOrange/20",
      text: "text-warningOrange dark:text-amber-400",
      border: "border-warningOrange",
    },
    error: {
      bg: "bg-incidentRed/10 dark:bg-incidentRed/20",
      text: "text-incidentRed dark:text-red-400",
      border: "border-incidentRed",
    },
    success: {
      bg: "bg-successGreen/10 dark:bg-successGreen/20",
      text: "text-successGreen dark:text-green-400",
      border: "border-successGreen",
    },
  },
};

/**
 * Safe utility to parse standard status strings (e.g. from check runs)
 * into workstation console visual states.
 */
export function getStatusTheme(status?: string | null) {
  const norm = (status || "").toLowerCase();
  if (norm.includes("fail") || norm.includes("error") || norm.includes("incident") || norm.includes("red")) {
    return THEME_UTILITIES.states.error;
  }
  if (norm.includes("warn") || norm.includes("pending") || norm.includes("orange")) {
    return THEME_UTILITIES.states.warning;
  }
  if (norm.includes("success") || norm.includes("pass") || norm.includes("green") || norm.includes("complete")) {
    return THEME_UTILITIES.states.success;
  }
  return THEME_UTILITIES.states.info;
}
