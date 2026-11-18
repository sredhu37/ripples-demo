import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { TimelineScreen } from "./TimelineScreen";
import { seedTimeline } from "../testing/seed";
import { eventsFor } from "../timeline/events";

const TIMELINE = seedTimeline();

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

async function mount(
  lang: "en" | "de" | "pl" = "en",
  onClose = () => {},
  load = () => Promise.resolve(TIMELINE),
) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(<TimelineScreen lang={lang} onLang={() => {}} onClose={onClose} load={load} />);
  });
  return container;
}

describe("TimelineScreen", () => {
  it("shows the first era cards", async () => {
    const c = await mount();
    expect(c.querySelectorAll(".timeline-card").length).toBe(
      eventsFor(TIMELINE.events, "ancient", "all").length,
    );
    expect(c.textContent).toContain("Indus Valley cities");
  });

  it("switches era and shows other cards", async () => {
    const c = await mount();
    const tabs = c.querySelectorAll<HTMLButtonElement>("[role=tab]");
    expect(tabs).toHaveLength(TIMELINE.eras.length);
    await act(async () => tabs[3].click());
    expect(c.textContent).toContain("Newton explains gravity");
  });

  it("filters by region", async () => {
    const c = await mount();
    const tabs = c.querySelectorAll<HTMLButtonElement>("[role=tab]");
    await act(async () => tabs[3].click());
    const chips = Array.from(c.querySelectorAll<HTMLButtonElement>(".timeline-regions .chip"));
    const science = chips.find((b) => b.textContent?.includes("Science"))!;
    await act(async () => science.click());
    expect(c.querySelectorAll(".timeline-card").length).toBe(
      eventsFor(TIMELINE.events, "scientific_rev", "science").length,
    );
    expect(c.textContent).not.toContain("Taj Mahal");
  });

  it("shows the single summary of each event", async () => {
    const c = await mount();
    expect(c.textContent).toContain("People build neat cities");
  });

  it("renders in German and calls onClose", async () => {
    const onClose = vi.fn();
    const c = await mount("de", onClose);
    expect(c.textContent).toContain("Weltzeitleiste");
    await act(async () => c.querySelector<HTMLButtonElement>(".topbar .btn")!.click());
    expect(onClose).toHaveBeenCalled();
  });

  it("shows an error with Try again when the API fails, then recovers", async () => {
    const load = vi.fn().mockRejectedValueOnce(new Error("down")).mockResolvedValueOnce(TIMELINE);
    const c = await mount("en", () => {}, load);
    expect(c.querySelector("[role=alert]")?.textContent).toContain("Can't reach Ripples");
    expect(c.querySelectorAll(".timeline-card")).toHaveLength(0);
    await act(async () => c.querySelector<HTMLButtonElement>("[role=alert] .btn")!.click());
    expect(load).toHaveBeenCalledTimes(2);
    expect(c.textContent).toContain("Indus Valley cities");
  });
});
