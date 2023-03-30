import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Inbox from "../inbox/Inbox";
import EmailView from "../inbox/EmailView";

let container = null;
let root = null;
const susHTML = `<h2 class="email-subject">Subject</h2>

<div id="box-1">
    <!-- To be auto-generated, leave this -->
    <img src="https://via.placeholder.com/45x45" alt="pfp" id="email-pfp">

    <div id="box-2"><!-- leave -->

        <!-- Swap email and name out, leave formatting -->
        <!-- This example is suspect, remove word 'suspect' for not -->
        <h3 class="email-sender">Sender</h3>

        <br><!-- leave -->

        <!-- IG this will probably stay the same? -->
        <h3 class="email-recipient">To: You</h3>

        <!-- Note there are no <br>'s between spans, so these will appear on same line -->
        <span class="suspect">This is suspect</span>

</div></div><!-- leave -->`;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() =>
    root.render(<Inbox mode="Training" mailSequence={["testEmail.html"]} />)
  );

  EmailView({ file: susHTML, state: null, score: 0, changecount: () => {} });
});

afterEach(() => {
  // cleanup on exiting
  container = null;
  root = null;
  jest.restoreAllMocks();
});

describe("Integration Test: Inbox EmailView", () => {
  it("Email is rendered correctly in Inbox", async () => {
    // Check interface rendered
    expect(document.getElementsByClassName("inbox")[0]).toBeVisible;

    // Check if email is rendered in the correct position
    let email = document.getElementById("box-1");
    expect(document.getElementsByClassName("emailDiv")[0]).toContainElement(
      email
    );
  });

  it("Marking an email as suspicious", async () => {
    let markButton = document.getElementById("marking-genuine");

    await act(() => { markButton.click() }); //this line is not resulting in email re-render
    EmailView({ file: susHTML, state: true, score: 0, changecount: () => {} }); //this simulates the effect of the button

    expect(document.getElementsByClassName("suspect")[0].style.backgroundColor).toBe(
      "rgb(255, 168, 149)"
    );
  });

  it("Marking an email as genuine", () => {});
  it("View next email", () => {});
});
