import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import App from "../App";

let container = null;
let root = null;
const modes = ["Menu", "Training", "Testing"];

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  // cleanup on exiting
  container = null;
  root = null;
  jest.restoreAllMocks();
});

describe("Integration Test: App-Inbox", () => {
  const spy = (mode) => {
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [mode, () => {}]);
  };
  for (let i = 0; i < modes.length; i++) {
    it(`${modes[i]} mode is rendered correctly`, async () => {
      spy(modes[i]);

      await act(() => root.render(<App />));

      expect(document.getElementsByClassName("app-title")[0]?.textContent).toBe(
        modes[i]
      );
    });
  }

  afterEach(() => {
    // cleanup on exiting
    act(() => root.unmount());
  });
});
