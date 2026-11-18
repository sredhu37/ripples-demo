import { useEffect, useState } from "react";
import type { FactCard, Text } from "./lesson/types";
import type { Meanwhile, TimelineEra, TimelineEvent, TimelineRegion } from "./timeline/types";

/** A lesson as /api/groups returns it. `position` is the global lesson order the save code uses. */
export interface ApiLesson {
  id: string;
  position: number;
  title: Text;
  hasMeanwhile: boolean;
}

export interface ApiGroup {
  id: string;
  title: Text;
  lessons: ApiLesson[];
}

export interface LessonFacts extends FactCard {
  lessonId: string;
}

export interface TimelineData {
  eras: TimelineEra[];
  regions: TimelineRegion[];
  events: TimelineEvent[];
  meanwhile: Record<string, Meanwhile>;
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`);
  if (!res.ok) throw new Error(`GET /api${path}: ${res.status}`);
  return (await res.json()) as T;
}

export const fetchGroups = () => getJson<ApiGroup[]>("/groups");
export const fetchFacts = () => getJson<LessonFacts[]>("/facts");
export const fetchTimeline = () => getJson<TimelineData>("/timeline");

export type Loaded<T> = { state: "loading" } | { state: "error" } | { state: "ok"; data: T };

/** Runs `load` once on mount and again on every retry. There is no cache: each screen asks the API. */
export function useApi<T>(load: () => Promise<T>): { result: Loaded<T>; retry: () => void } {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Loaded<T>>({ state: "loading" });

  useEffect(() => {
    let live = true;
    setResult({ state: "loading" });
    load().then(
      (data) => live && setResult({ state: "ok", data }),
      () => live && setResult({ state: "error" }),
    );
    return () => {
      live = false;
    };
    // `load` is a stable module function; only a retry should refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  return { result, retry: () => setAttempt((n) => n + 1) };
}
