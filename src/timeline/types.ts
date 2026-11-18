import type { Text } from "../lesson/types";

export type TimelineEraId =
  | "ancient"
  | "middle_ages"
  | "trade_empires"
  | "scientific_rev"
  | "industrial"
  | "twentieth"
  | "digital";

export type TimelineRegion =
  | "india"
  | "europe"
  | "americas"
  | "east_asia"
  | "mideast_africa"
  | "science";

export interface TimelineEra {
  id: TimelineEraId;
  label: Text;
  dateRange: Text;
  description: Text;
}

export interface TimelineEvent {
  id: string;
  era: TimelineEraId;
  year: Text;
  region: TimelineRegion;
  title: Text;
  summary: Text;
  lessonId?: string;
  keyFigure?: string;
  /** Reference URL for the claim a meanwhile card makes about this event. */
  source?: string;
}

/** "Meanwhile around the world" window shown at the end of a history lesson. */
export interface Meanwhile {
  from: number;
  to: number;
  text: Text;
}
