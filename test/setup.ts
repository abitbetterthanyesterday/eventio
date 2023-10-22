import "@testing-library/jest-dom"
import { vi, beforeAll, beforeEach, afterAll, afterEach } from "vitest"

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

beforeAll(async () => {})

beforeEach(async () => {})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {})

// Clean up after the tests are finished.
afterAll(() => {})
