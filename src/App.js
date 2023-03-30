import Header from "./interface/Header";
import Menu from "./interface/Menu";
import Inbox from "./inbox/Inbox";
import { useState } from "react";
import mailSequences from "./emails.json";
import PopUp from "./interface/PopUp";
import UsernameForm from "./interface/UsernameForm";
import StoreData from "./StoreData";

export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getMailSequence = (mode) => {
  let path_prefix = mailSequences.path_prefix;
  const mailSequence = mailSequences[mode].map((e) => path_prefix + e);
  return mailSequence;
};

function App() {
  const [mode, setMode] = useState("Menu");
  const buttons = ["Training", "Testing"];
  let name = null;
  const setName = (input) => {
    StoreData.storeKeyValue("name", input);
  };
  name = StoreData.getValue("name");

  return (
    <div className="App">
      <Header title={mode} />
      {name === null && (
        <PopUp title={"Please enter your name"}>
          <UsernameForm submit={setName} />
        </PopUp>
      )}
      {mode === "Menu" ? (
        <Menu setLocation={setMode} buttons={buttons} />
      ) : mode === "Training" || mode === "Testing" ? (
        <Inbox
          mode={mode}
          nextMode={buttons[buttons.indexOf(mode) + 1]}
          mailSequence={getMailSequence(mode)}
          name={name}
        />
      ) : (
        //unrecognised mode
        <p>Unknown Mode</p>
      )}
    </div>
  );
}

export default App;
