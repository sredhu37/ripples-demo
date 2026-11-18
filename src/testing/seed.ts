// Test-only: reads db/seed.sql, the source of truth for curriculum data, into the API's JSON shapes.
// The app never imports this file, so the seed stays out of the bundle.
import seedSql from "../../db/seed.sql?raw";
import type { ApiGroup, LessonFacts, TimelineData } from "../api";
import type { Text } from "../lesson/types";
import { toCurriculum, type Curriculum } from "../lessons";
import type { TimelineEraId, TimelineRegion } from "../timeline/types";

type Value = string | number | null;
type Row = Record<string, Value>;

/** Parses the `INSERT INTO t (cols) VALUES (...), (...);` statements the export wrote. */
function parse(sql: string): Map<string, Row[]> {
  const tables = new Map<string, Row[]>();
  const head = /INSERT INTO (\w+) \(([^)]*)\) VALUES\s*/g;
  let m: RegExpExecArray | null;
  while ((m = head.exec(sql))) {
    const cols = m[2].split(",").map((c) => c.trim());
    const rows: Row[] = [];
    let i = head.lastIndex;
    let tuple: Value[] = [];
    let open = false;
    while (i < sql.length) {
      const ch = sql[i];
      if (!open) {
        if (ch === "(") {
          open = true;
          tuple = [];
        } else if (ch === ";") break;
        i++;
        continue;
      }
      if (ch === "'") {
        let s = "";
        i++;
        while (i < sql.length) {
          if (sql[i] === "\\") {
            s += sql[i + 1];
            i += 2;
          } else if (sql[i] === "'" && sql[i + 1] === "'") {
            s += "'";
            i += 2;
          } else if (sql[i] === "'") {
            i++;
            break;
          } else s += sql[i++];
        }
        tuple.push(s);
      } else if (ch === ")") {
        rows.push(Object.fromEntries(cols.map((c, k) => [c, tuple[k]])));
        open = false;
        i++;
      } else if (/[-\d]/.test(ch)) {
        const num = /^-?\d+/.exec(sql.slice(i))![0];
        tuple.push(Number(num));
        i += num.length;
      } else if (sql.startsWith("NULL", i)) {
        tuple.push(null);
        i += 4;
      } else i++;
    }
    head.lastIndex = i;
    tables.set(m[1], rows);
  }
  return tables;
}

const tables = parse(seedSql);
const rows = (t: string) => tables.get(t) ?? [];
const str = (r: Row, c: string) => r[c] as string;
const num = (r: Row, c: string) => r[c] as number;
const text = (r: Row, c: string): Text => ({
  en: str(r, `${c}_en`),
  de: str(r, `${c}_de`),
  pl: str(r, `${c}_pl`),
});
const byPos = (a: Row, b: Row) => num(a, "position") - num(b, "position");

export function seedGroups(): ApiGroup[] {
  const meanwhile = new Set(rows("meanwhile").map((r) => str(r, "lesson_id")));
  return [...rows("curriculum_groups")].sort(byPos).map((g) => ({
    id: str(g, "id"),
    title: text(g, "title"),
    lessons: rows("lessons")
      .filter((l) => l.group_id === g.id)
      .sort((a, b) => num(a, "group_position") - num(b, "group_position"))
      .map((l) => ({
        id: str(l, "id"),
        position: num(l, "position"),
        title: text(l, "title"),
        hasMeanwhile: meanwhile.has(str(l, "id")),
      })),
  }));
}

export function seedCurriculum(): Curriculum {
  return toCurriculum(seedGroups());
}

export function seedFacts(): LessonFacts[] {
  return seedCurriculum().lessons.map(({ id }) => ({
    lessonId: id,
    claims: rows("fact_claims")
      .filter((r) => r.lesson_id === id)
      .sort(byPos)
      .map((r) => ({ text: text(r, "text"), source: str(r, "source") })),
    simplified: rows("fact_simplified")
      .filter((r) => r.lesson_id === id)
      .sort(byPos)
      .map((r) => text(r, "text")),
  }));
}

export function seedTimeline(): TimelineData {
  return {
    eras: [...rows("timeline_eras")].sort(byPos).map((r) => ({
      id: str(r, "id") as TimelineEraId,
      label: text(r, "label"),
      dateRange: text(r, "date_range"),
      description: text(r, "description"),
    })),
    regions: [...rows("timeline_regions")].sort(byPos).map((r) => str(r, "id") as TimelineRegion),
    events: [...rows("timeline_events")].sort(byPos).map((r) => ({
      id: str(r, "id"),
      era: str(r, "era_id") as TimelineEraId,
      region: str(r, "region_id") as TimelineRegion,
      year: text(r, "year"),
      title: text(r, "title"),
      summary: text(r, "summary"),
      ...(r.lesson_id === null ? {} : { lessonId: str(r, "lesson_id") }),
      ...(r.key_figure === null ? {} : { keyFigure: str(r, "key_figure") }),
      ...(r.source === null ? {} : { source: str(r, "source") }),
    })),
    meanwhile: Object.fromEntries(
      rows("meanwhile").map((r) => [
        str(r, "lesson_id"),
        { from: num(r, "year_from"), to: num(r, "year_to"), text: text(r, "text") },
      ]),
    ),
  };
}
