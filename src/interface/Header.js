import React from "react";
import "./Interface.css";
import Settings from "./Settings";
export default function Menu({ title }) {
  return (
    <header className="app-header">
      <h1 className="app-inlook">Inlook</h1>
      <h1 className="app-title">{title}</h1>
      {/* <h1 className="app-title">{title}</h1> */}
      <Settings className="app-settings" />
    </header>
  );
}
