import "@testing-library/jest-dom";
import { vi } from "vitest";

// Every test gets a stand-in fetch, so components that load data
// never reach a real network. Tests decide what it returns.
beforeEach(() => {
  globalThis.fetch = vi.fn();
});
