import React from "react";
import { createRoot } from "react-dom/client";
import { act, fireEvent } from "@testing-library/react";
import Menu from "../interface/Menu";
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


describe("Unit Test: Menu Functionality", () => {
    it("All buttons rendered", async () => {
        await act(() => {
            root.render(<Menu setLocation = {() => {}} buttons = {[0,1,2]} />)
        });

        let menu = document.getElementsByClassName("menu")[0];

        // Check that all buttons exist, labled correctly
        expect(menu.children.length).toBe(3);
        for (let i = 0; i < 3; i++) {
            expect(menu.children[i].tagName + menu.children[i].innerHTML).toBe("BUTTON" + i);
        }
    });


    it("All button clicks excecute function", async () => {
        
        let clickValues = [false, false, false]
        let setFunc = (i) => { clickValues[i] = true }

        await act(() => {
            root.render(<Menu setLocation = {setFunc} buttons = {[0,1,2]} />)
        });


        let menu = document.getElementsByClassName("menu")[0];

        expect(menu.children.length).toBe(3);

        //check clicks have effect
        for (let i = 0; i < 3; i++) {
            await act(() => menu.children[i].click())

            expect(clickValues[i]).toBe(true);
        }
    });
})

