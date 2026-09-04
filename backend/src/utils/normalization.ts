/**
 * HackNEX 2026 Data Normalization Utilities
 * Enforces Phase 2 Section 22 Data Normalization Rules
 */

/**
 * Trim leading and trailing whitespace from string values
 */
export function trimString(value: string): string {
  return value ? value.trim() : '';
}

/**
 * Normalize email addresses to lowercase and trimmed string
 */
export function normalizeEmail(email: string): string {
  return email ? email.trim().toLowerCase() : '';
}

/**
 * Normalize team names by:
 * 1. Trimming leading & trailing whitespace
 * 2. Converting to lowercase
 * 3. Collapsing repeated interior spaces into a single space
 *
 * Example: "  Code   Titans  " -> "code titans"
 */
export function normalizeTeamName(teamName: string): string {
  if (!teamName) return '';
  return teamName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}
