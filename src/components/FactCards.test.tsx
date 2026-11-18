import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { FactCards } from "./FactCards";
import { seedCurriculum, seedFacts } from "../testing/seed";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const LESSONS = seedCurriculum().lessons;
const FACTS = seedFacts();

async function mount(load: () => Promise<typeof FACTS>, lang: "en" | "pl" = "en") {
  const c = document.createElement("div");
  document.body.appendChild(c);
  const root = createRoot(c);
  await act(async () =>
    root.render(<FactCards lang={lang} lessons={LESSONS} onClose={() => {}} load={load} />),
  );
  return c;
}

describe("FactCards", () => {
  it("shows one card per lesson with every claim and its source", async () => {
    const c = await mount(() => Promise.resolve(FACTS));
    expect(c.querySelectorAll(".fact-card")).toHaveLength(LESSONS.length);
    const money = FACTS.find((f) => f.lessonId === "money")!;
    expect(c.textContent).toContain(money.claims[0].text.en);
    expect(c.querySelector(`a[href="${money.claims[0].source}"]`)).not.toBeNull();
  });

  it("renders the claims in Polish", async () => {
    const c = await mount(() => Promise.resolve(FACTS), "pl");
    expect(c.textContent).toContain(FACTS[0].claims[0].text.pl);
  });

  it("shows a loading state, then an error with Try again, then the cards", async () => {
    let fail: (e: Error) => void = () => {};
    const load = vi
      .fn()
      .mockReturnValueOnce(new Promise((_, reject) => (fail = reject)))
      .mockResolvedValueOnce(FACTS);
    const c = await mount(load);
    expect(c.querySelector("[role=status]")?.textContent).toContain("Loading");
    await act(async () => fail(new Error("down")));
    expect(c.querySelector("[role=alert]")).not.toBeNull();
    await act(async () => c.querySelector<HTMLButtonElement>("[role=alert] .btn")!.click());
    expect(c.querySelectorAll(".fact-card")).toHaveLength(LESSONS.length);
  });
});
