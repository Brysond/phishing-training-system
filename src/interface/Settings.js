import React, { useEffect } from "react";
import "./Settings.css";
import StoreData from "./../StoreData";

function openSettings() {
  document.getElementById("settingsDropdown").classList.toggle("show");
}

export default function Settings() {
  useEffect(() => {
    const slider = document.getElementById("font-sizer");
    slider.addEventListener("change", () => {
      document.getElementsByClassName("App")[0].style.fontSize =
        slider.value + "em";
    });
  });

  const saveData = () => {
    StoreData.exportData();
  };

  return (
    <div className="settings-menu">
      <button onClick={() => openSettings()} className="settingsbtn">
        <img src={"./icon.png"} alt="Settings" className="settings-logo" />{" "}
      </button>
      <div id="settingsDropdown" className="settings">
        <h2>Settings</h2>

        <div className="font-slider">
          Font Size:
          <input
            type="range"
            min="0.7"
            max="2"
            defaultValue="1"
            step="0.1"
            className="slider"
            id="font-sizer"
          ></input>
        </div>

        <button className="home-button" onClick={() => window.location="/"} >
          Home
        </button>

        <button  className="home-button"onClick={() => {saveData();}}>
          Save
        </button>
      </div>
    </div>
  );
}
