import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";
import { emptyProgress, saveProgress } from "./progress";
import { seedGroups } from "./testing/seed";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

describe("App start", () => {
  it("loads the curriculum from /api/groups, shows an error when it fails, and recovers", async () => {
    saveProgress(window.localStorage, {
      ...emptyProgress(),
      name: "Ana",
      lang: "en",
      badges: ["money"],
    });
    const fetch = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce(new Response(JSON.stringify(seedGroups()), { status: 200 }));
    vi.stubGlobal("fetch", fetch);

    const c = document.createElement("div");
    document.body.appendChild(c);
    await act(async () => createRoot(c).render(<App />));

    expect(fetch).toHaveBeenCalledWith("/api/groups");
    expect(c.querySelector("[role=alert]")?.textContent).toContain("Can't reach Ripples");

    await act(async () => c.querySelector<HTMLButtonElement>("[role=alert] .btn")!.click());
    expect(fetch).toHaveBeenCalledTimes(2);
    // The badge saved in browser storage survives the failed fetch; lesson 2 is next.
    expect(c.textContent).toContain("Work and pay");
    expect(c.querySelector(".stop-done")).not.toBeNull();
  });
});
