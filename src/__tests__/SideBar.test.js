import React from "react";
import { createRoot } from "react-dom/client";
import { act, fireEvent } from "@testing-library/react";
import Sidebar from "../inbox/Sidebar";
import SidebarEmail from "../inbox/SidebarEmail";
import "@testing-library/jest-dom";
process.env["NODE_DEV"] = "TEST";
let { processMail } = require("../inbox/Sidebar");
let container = null;
let root = null;
const file = `<h2 class="email-subject">Subject</h2>

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
});

afterEach(() => {
  // cleanup on exiting
  act(() => root.unmount());
  container = null;
  root = null;
});

describe("Integaration Test: Sidebar-SidebarEmail", () => {
  it("Integration Test: Correct elements displayed", async () => {
    await act(() =>
      root.render(<Sidebar shownMail={[file]} setCurrentMail={() => {}} />)
    );

    // Check that the correct elements are rendered
    expect(
      document.getElementsByClassName("sidebar-email")[0]
    ).toHaveTextContent("Subject");

    expect(
      document.getElementsByClassName("sidebar-email")[0]
    ).toHaveTextContent("Sender");

    // Amount of message shown is 30 characters, so this should be the case
    expect(
      document.getElementsByClassName("sidebar-email")[0]
    ).toHaveTextContent("This is suspect ...");
  });
  it("Integration Test: Click SidebarEmail", async () => {
    const mockCallBack = jest.fn();

    // await act(() => root.render(<Email setCurrentMail={mockCallBack} />));
    await act(
      () =>
        root.render(
          <SidebarEmail
            mailNumber={0}
            sender="Sender"
            subject="Subject"
            message="message ..."
            setCurrentMail={mockCallBack}
          />
        ) + 3
    );

    fireEvent.click(document.getElementsByClassName("sidebar-email")[0]);

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
it("Unit Test: Process Email", async () => {
  const data = processMail(file);

  expect(data["subject"]).toEqual("Subject");
  expect(data["sender"]).toEqual("Sender");
  expect(data["message"]).toEqual("This is suspect ...");
});
