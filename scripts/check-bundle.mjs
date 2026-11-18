// Fails when curriculum text from db/seed.sql shows up in the built bundle.
// Run after `npm run build`: npm run check:bundle
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const seed = readFileSync("db/seed.sql", "utf8");
const assets = join("dist", "assets");
const bundle = readdirSync(assets)
  .filter((f) => f.endsWith(".js"))
  .map((f) => readFileSync(join(assets, f), "utf8"))
  .join("\n");

// Every quoted seed value of 30+ characters: titles, claims, summaries, meanwhile texts.
// Short values (ids, years, region names) also appear in lesson code and are not curriculum data.
const texts = new Set(
  [...seed.matchAll(/'((?:[^']|'')+)'/g)]
    .map((m) => m[1].replaceAll("''", "'"))
    .filter((t) => t.length >= 30),
);

const found = [...texts].filter((t) => bundle.includes(t));
if (found.length > 0) {
  console.error(`${found.length} of ${texts.size} seed texts are in the bundle, e.g.:`);
  for (const t of found.slice(0, 5)) console.error(`  ${t}`);
  process.exit(1);
}
console.log(`OK: none of ${texts.size} seed texts are in dist/assets.`);
