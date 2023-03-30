import React from "react";
import { createRoot } from "react-dom/client";
import { act, fireEvent } from "@testing-library/react";
import SidebarEmail from "../inbox/SidebarEmail";
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


it("Unit Test: All side-email features rendered", async () => {
    await act(() =>
        root.render(<SidebarEmail 
            mailNumber = {0}
            sender = {"senderTEST"}
            subject = {"subjectTEST"}
            message = {"messageTEST"}
            setCurrentMail = {() => {}} />)
    );

    let sideMail = document.getElementsByClassName("sidebar-email-info")[0];

    // Check that the correct elements are rendered
    expect(sideMail).toHaveTextContent("senderTEST");
    expect(sideMail).toHaveTextContent("subjectTEST");
    expect(sideMail).toHaveTextContent("messageTEST");
});

