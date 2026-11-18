import type { ApiGroup } from "./api";
import type { Lang } from "./progress";
import type { Text } from "./lesson/types";

export interface LessonMeta {
  /** Stable id, saved in progress and in the save code. Only ever append new ids at the end of a group. */
  id: string;
  title: Text;
  /** True for lessons that end with a "meanwhile around the world" card. */
  hasMeanwhile: boolean;
}

export interface LessonGroup {
  id: string;
  title: Text;
  lessonIds: string[];
}

/** The curriculum as the app uses it, built from GET /api/groups. */
export interface Curriculum {
  groups: LessonGroup[];
  /** Every lesson in save-code order. */
  lessons: LessonMeta[];
  /** Lesson ids in save-code order. */
  order: string[];
}

export function toCurriculum(api: ApiGroup[]): Curriculum {
  const lessons = api
    .flatMap((g) => g.lessons)
    .sort((a, b) => a.position - b.position)
    .map(({ id, title, hasMeanwhile }) => ({ id, title, hasMeanwhile }));
  return {
    groups: api.map((g) => ({ id: g.id, title: g.title, lessonIds: g.lessons.map((l) => l.id) })),
    lessons,
    order: lessons.map((l) => l.id),
  };
}

export function getLessonTitle(meta: LessonMeta, lang: Lang): string {
  return meta.title[lang];
}

export function getGroupTitle(group: LessonGroup, lang: Lang): string {
  return group.title[lang];
}
