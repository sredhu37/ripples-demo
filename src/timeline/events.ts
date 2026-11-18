import type { Meanwhile, TimelineEraId, TimelineEvent, TimelineRegion } from "./types";

export function eventsFor(
  events: TimelineEvent[],
  era: TimelineEraId,
  region: TimelineRegion | "all",
): TimelineEvent[] {
  return events.filter((e) => e.era === era && (region === "all" || e.region === region));
}

/** Sort key in years. BCE is negative. "1500s" counts as 1500. */
export function eventYear(e: TimelineEvent): number {
  const n = Number(/\d+/.exec(e.year.en)?.[0] ?? "0");
  return /BCE/.test(e.year.en) ? -n : n;
}

export function meanwhileEvents(events: TimelineEvent[], m: Meanwhile): TimelineEvent[] {
  return events
    .filter((e) => eventYear(e) >= m.from && eventYear(e) <= m.to)
    .sort((a, b) => eventYear(a) - eventYear(b));
}

/** Latest event per track on or before `year`, within the window. */
export function snapshotAt(events: TimelineEvent[], m: Meanwhile, year: number): TimelineEvent[] {
  const latest = new Map<string, TimelineEvent>();
  for (const e of meanwhileEvents(events, m)) if (eventYear(e) <= year) latest.set(e.region, e);
  return Array.from(latest.values());
}
