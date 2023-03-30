import React from "react";
import { createRoot } from "react-dom/client";
import { act, fireEvent } from "@testing-library/react";
import {App, shuffle} from "../App";
import "@testing-library/jest-dom";

let container = null;
let root = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  // cleanup on exiting
  act(() => root.unmount());
  container = null;
  root = null;
});


it("Unit Test: Shuffle functional", async () => {
    let testArray = []
    let changed = false;

    for (let i = 0; i < 100; i++) {
        testArray = [0,1,2,3,4,5]
        shuffle(testArray)
        for(let i = 0; i < testArray.length; i++) {
            if (testArray[i] != i) changed = true;
        }
        if (changed) break;
    }

    //array was never shuffled
    expect(changed).toBeTruthy()
});

