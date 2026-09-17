/**
 * Fills {placeholders} in an editable message template.
 * Kept separate from content.ts so client components can use it without
 * pulling the filesystem-backed content loader into the browser bundle.
 */
export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");
}
