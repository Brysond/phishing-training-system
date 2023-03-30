import React from "react";
import Avatar from "./Avatar";
import { appendJSXtoDOM } from "./utility";

function preProcess(state, score, changeCount, isTestMode, name) {
  document.getElementById("box-2").innerHTML = document
    .getElementById("box-2")
    .innerHTML.replaceAll("[persons_name]", name);

  let susFeatures = 0;

  let children = [
    ...document.getElementById("box-2").children,
    document.getElementsByClassName("email-subject")[0],
  ];

  //format email caution
  let emailCaution = document.getElementById("email-caution");
  if (emailCaution) {
    document.getElementById(
      "email-caution"
    ).innerHTML = `<p class="email-caution-text">
          <em class="email-caution-em">BATH ABBEY CAUTION</em>: This email
          originated from outside the organization.
          </p>`;
  }

  //format avatar
  let emailPfp = document.getElementById("email-pfp");
  let sender =
    document.querySelector(".email-sender").childNodes[0].textContent;
  if (emailPfp) {
    let temp = document.createElement("div");
    temp.id = "email-pfp";
    emailPfp.replaceWith(temp);
    appendJSXtoDOM(
      document.getElementById("email-pfp"),
      <Avatar name={sender} />
    );
  }

  // if sender contains inlook return
  if (sender.includes("Inlook")) return;

  for (let i = 0; i < children.length; i++) {
    let child = children[i];

    if (child.classList.contains("missing")) {
      child.style.width = "50%";
    }

    switch (state) {
      case null: //the email has not been decided, add standard click functions
        child.clicked = false;
        child.addEventListener("click", () => {
          if (!child.clicked) {
            child.clicked = true;
            child.style.backgroundColor = "#ffaa00";
            if (child.classList.contains("suspect")) changeCount(1);
          } else {
            child.clicked = false;
            child.style.backgroundColor = "";

            if (child.classList.contains("suspect")) changeCount(-1);
          }
        });
        break;

      default: //the email has been selected, highlight sus elements
        if (!isTestMode) {
          child.classList.add("unselectable");
          if (child.classList.contains("suspect")) {
            child.style.backgroundColor = "#FFA895";
            susFeatures += 1;
          }
        }
        break;
    }
  }

  let newDiv = document.createElement("div");
  newDiv.classList.add("unselectable");
  document.getElementById("box-2").appendChild(newDiv);

  if (!isTestMode) {
    if (state === true) {
      //email has been categorised as phishing
      newDiv.innerHTML +=
        susFeatures > 0 //correct
          ? `
            <br><span>════════════════════════</span>
            <h1 id = "submissionFeedback">Correct, identified ` +
            score +
            "/" +
            susFeatures +
            `</h1>
            <span>This email is an example of phishing</span><br><br>
            
            `
          : //incorrect
            `
        <br><span>════════════════════════</span>
        <h1 id = "submissionFeedback">Incorrect</h1>
        <span>This email is not an example of phishing</span><br><br>
        
        `;
    }

    if (state === false) {
      //email has been categorised as NOT phishing
      newDiv.innerHTML +=
        susFeatures === 0 //correct
          ? `
            <br><span>════════════════════════</span>
            <h1 id = "submissionFeedback">Correct</h1>
            <span>This email is not an example of phishing</span><br><br>
            
            `
          : //incorrect
            `
        <br><span>════════════════════════</span>
        <h1 id = "submissionFeedback">Incorrect</h1>
        <span>This email is an example of phishing</span><br><br>
        
        `;
    }

    //feedback should be displayed
    if (state != null && document.getElementById("feedBackMsg")) {
      newDiv.innerHTML +=
        document.getElementById("feedBackMsg").innerHTML + "<br>";
    } else if (state != null) {
      newDiv.innerHTML += "FEEDBACK NOT FOUND";
    }
  }
}

export default function EmailView({
  file,
  state,
  score,
  changeCount,
  isTestMode = false,
  name,
}) {
  if (file) {
    let targetDiv = document.getElementsByClassName("emailDiv")[0];
    targetDiv.innerHTML = file;
    preProcess(state, score, changeCount, isTestMode, name);
  }
  //makes div with id of address, loads file from address, places html into div
  return <></>;
}
