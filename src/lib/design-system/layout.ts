export const LAYOUT = {
  SIDEBAR_WIDTH: 280,         // px width for navigation sidebar
  CONTEXT_PANEL_WIDTH: 280,   // px width for metadata inspector panel
  REPORT_MAX_WIDTH: 1200,     // px max-width for investigation reports
  CONTENT_MAX_WIDTH: 1200,    // px max-width for standard content pages
  
  // Standardised Spacing Tokens (4px Scale)
  verticalRhythm: {
    xs: 4,                    // px (space-y-1 / gap-1)
    sm: 8,                    // px (space-y-2 / gap-2)
    md: 12,                   // px (space-y-3 / gap-3)
    lg: 16,                   // px (space-y-4 / gap-4) - Content Gap
    xl: 24,                   // px (space-y-6 / gap-6) - Card Gap
    xxl: 32,                  // px (space-y-8 / gap-8)
    section: 48,              // px (space-y-12 / gap-12) - Section Gap
    container: 64,            // px (space-y-16 / gap-16)
  }
} as const;

export type LayoutConfig = typeof LAYOUT;
