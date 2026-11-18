// One-time export of the curriculum data into db/seed.sql.
// Run with: npx vitest run --config scripts/vitest.export.config.ts
// It runs under Vitest because the lesson files import CSS and TSX, which plain Node cannot load.
import { writeFileSync } from "node:fs";
import { test } from "vitest";
import { getLesson } from "../src/content";
import { CURRICULUM_GROUPS, LESSONS } from "../src/lessons";
import type { Text } from "../src/lesson/types";
import { TIMELINE_ERAS, TIMELINE_EVENTS, TIMELINE_REGIONS } from "../src/timeline/data";
import { EVENT_SOURCES, MEANWHILE } from "../src/timeline/meanwhile";

type Value = string | number | null;

function sql(v: Value): string {
  if (v === null) return "NULL";
  if (typeof v === "number") return String(v);
  return `'${v.replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;
}

const tri = (t: Text): Value[] => [t.en, t.de, t.pl];

function insert(table: string, columns: string[], rows: Value[][]): string {
  const values = rows.map((r) => `  (${r.map(sql).join(", ")})`).join(",\n");
  return `INSERT INTO ${table} (${columns.join(", ")}) VALUES\n${values};\n`;
}

const TEXT = (name: string) => [`${name}_en`, `${name}_de`, `${name}_pl`];

test("export curriculum to db/seed.sql", () => {
  const groupOf = new Map<string, { groupId: string; pos: number }>();
  for (const g of CURRICULUM_GROUPS)
    g.lessonIds.forEach((id, i) => groupOf.set(id, { groupId: g.id, pos: i }));

  const claims: Value[][] = [];
  const simplified: Value[][] = [];
  for (const meta of LESSONS) {
    // getLesson returns the card with the meanwhile-derived claims already appended.
    const card = getLesson(meta.id)?.factCard;
    if (!card) continue;
    card.claims.forEach((c, i) => claims.push([meta.id, i, ...tri(c.text), c.source]));
    card.simplified.forEach((s, i) => simplified.push([meta.id, i, ...tri(s)]));
  }

  const out = [
    "-- Ripples curriculum data. This file is the source of truth for all curriculum text.",
    "SET NAMES utf8mb4;",
    "",
    insert(
      "curriculum_groups",
      ["id", "position", ...TEXT("title")],
      CURRICULUM_GROUPS.map((g, i) => [g.id, i, ...tri(g.title)]),
    ),
    insert(
      "lessons",
      ["id", "position", "group_id", "group_position", ...TEXT("title")],
      LESSONS.map((l, i) => {
        const g = groupOf.get(l.id);
        if (!g) throw new Error(`lesson ${l.id} is in no group`);
        return [l.id, i, g.groupId, g.pos, ...tri(l.title)];
      }),
    ),
    insert("fact_claims", ["lesson_id", "position", ...TEXT("text"), "source"], claims),
    insert("fact_simplified", ["lesson_id", "position", ...TEXT("text")], simplified),
    insert(
      "timeline_eras",
      ["id", "position", ...TEXT("label"), ...TEXT("date_range"), ...TEXT("description")],
      TIMELINE_ERAS.map((e, i) => [
        e.id,
        i,
        ...tri(e.label),
        ...tri(e.dateRange),
        ...tri(e.description),
      ]),
    ),
    insert(
      "timeline_regions",
      ["id", "position"],
      TIMELINE_REGIONS.map((r, i) => [r, i]),
    ),
    insert(
      "timeline_events",
      [
        "id",
        "position",
        "era_id",
        "region_id",
        ...TEXT("year"),
        ...TEXT("title"),
        ...TEXT("summary"),
        "lesson_id",
        "key_figure",
        "source",
      ],
      TIMELINE_EVENTS.map((e, i) => [
        e.id,
        i,
        e.era,
        e.region,
        ...tri(e.year),
        ...tri(e.title),
        ...tri(e.summary),
        e.lessonId ?? null,
        e.keyFigure ?? null,
        EVENT_SOURCES[e.id] ?? null,
      ]),
    ),
    insert(
      "meanwhile",
      ["lesson_id", "year_from", "year_to", ...TEXT("text")],
      Object.entries(MEANWHILE).map(([id, m]) => [id, m.from, m.to, ...tri(m.text)]),
    ),
  ].join("\n");

  writeFileSync(new URL("../db/seed.sql", import.meta.url), out);
  process.stdout.write(
    `seed: ${CURRICULUM_GROUPS.length} groups, ${LESSONS.length} lessons, ${claims.length} claims, ` +
      `${simplified.length} simplified, ${TIMELINE_ERAS.length} eras, ${TIMELINE_REGIONS.length} regions, ` +
      `${TIMELINE_EVENTS.length} events, ${Object.keys(MEANWHILE).length} meanwhile\n`,
  );
});
