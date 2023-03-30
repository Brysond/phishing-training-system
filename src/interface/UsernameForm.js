import "./Interface.css";
import { useState } from "react";

export default function UsernameForm({ submit }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    submit(input.charAt(0).toUpperCase() + input.slice(1));
  };

  return (
    <form onSubmit={handleSubmit} className="pop-up-form">
      <label>
        <input type="text" value={input} onChange={handleChange} />
      </label>
      <input id="pop-up-button" type="submit" value="Submit" />
    </form>
  );
}
