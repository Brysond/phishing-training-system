import React from "react";
import "./Interface.css";

export default function Menu({ setLocation, buttons }) {
  return (
    <div className="menu">
      {buttons.map((button) => (
        <button
          className="menu-button"
          key={button}
          onClick={() => setLocation(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
}
