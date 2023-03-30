import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import EmailView from "../inbox/EmailView";

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
const processedHTML = `<h2 class="email-subject">Subject</h2>

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

<div class="unselectable"></div></div></div><!-- leave -->`;


const safeHTML = `<h2 class="email-subject">Subject</h2>
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
        <span>This is suspect</span>

</div></div><!-- leave -->`;


let container = null;
let root = null;

beforeEach(() => {
  container = document.createElement("div");
  container.setAttribute("class", "emailDiv");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  // cleanup on exiting
  container = null;
  root = null;
  jest.restoreAllMocks();
});



it("Unit Test: Correct content processing", async () => {
  await act(() =>
    EmailView({ file: susHTML, state: null, score: 0, changecount: () => {} })
  );

  expect(document.getElementsByClassName("emailDiv")[0].innerHTML).toBe(
    processedHTML
  );
});


describe("Unit Test: Phishing email feedback", () => {
  
  it("Marked correctly, zero identified", async () => {
    await act(() => EmailView({ file: susHTML, state: true, score: 0, changecount: () => {} }));

    let submissionText = document.getElementById("submissionFeedback").innerHTML;

    expect(submissionText).toContain("Correct");
    expect(submissionText).toContain("0/1");
  });


  it("Marked correctly, all identified", async () => {
    await act(() => EmailView({ file: susHTML, state: true, score: 1, changecount: () => {} }));

    let submissionText = document.getElementById("submissionFeedback").innerHTML;

    expect(submissionText).toContain("Correct");
    expect(submissionText).toContain("1/1");
  });


  it("Marked incorrectly", async () => {
    await act(() => EmailView({ file: susHTML, state: false, score: 0, changecount: () => {} }));

    let submissionText = document.getElementById("submissionFeedback").innerHTML;

    expect(submissionText).toBe("Incorrect");
  });
});


describe("Unit Test: safe email feedback", () => {
  
  it("Marked correctly", async () => {
    await act(() => EmailView({ file: safeHTML, state: false, score: 0, changecount: () => {} }));

    let submissionText = document.getElementById("submissionFeedback").innerHTML;

    expect(submissionText).toBe("Correct");
  });


  it("Marked incorrectly", async () => {
    await act(() => EmailView({ file: safeHTML, state: true, score: 1, changecount: () => {} }));

    let submissionText = document.getElementById("submissionFeedback").innerHTML;

    expect(submissionText).toBe("Incorrect");
  });

});


describe("Unit Test: no feedback on test mode", () => {
    it("Suspect Email", async () => {
        await act(() => EmailView({ file: safeHTML, state: null, score: 0, changecount: () => {}, isTestMode: true }));
    
        let content = document.getElementsByClassName("emailDiv")[0].innerHTML


        document.getElementsByClassName("emailDiv")[0].remove()

        await act(() => EmailView({ file: safeHTML, state: true, score: 0, changecount: () => {}, isTestMode: true }));


        let content2 = document.getElementsByClassName("emailDiv")[0].innerHTML
    
        expect(content2).toBe(content);
      });
});