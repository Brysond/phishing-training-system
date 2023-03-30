import "./Inbox.css";
import EmailView from "./EmailView";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import StoreData from "./../StoreData";
import PopUp from "../interface/PopUp";
import MCQ from "./MCQ";
const getFile = async (fileName) => {
  const response = await fetch(fileName);
  return response.text();
};

const finishMode = (nextMode) => {
  let totalCorrect = 0;

  //calc total correct data-points in localstorage
  for (let key in localStorage) if (!isNaN(key)) 
  if (JSON.parse(localStorage.getItem(key))[3] === 
  JSON.parse(localStorage.getItem(key))[4]) totalCorrect++;
    
  return (
    <>
      <p>
        {nextMode !== undefined
          ? `Please return to the home screen and start ${nextMode}`
          : "You have completed our training system. Please let one of the trainers know."}
      </p>
      <p><strong>
        { nextMode === undefined ? 
        `You scored ${totalCorrect} / ${localStorage.getItem("key")}`
        :
        null}
    </strong></p>
      <form>
        <button id="pop-up-button" formaction="/">
          Home
        </button>
      </form>
    </>
  );
};

export default function Inbox({ mode, nextMode, mailSequence, name }) {
  const [shownMails, setShownMails] = useState([]);

  const [mailStates, setMailStates] = useState([]);
  const [mailScores, setMailScores] = useState([]);

  const [currentMail, setCurrentMail] = useState(0);
  const [time, setTime] = useState(0);
  const [completed, setCompleted] = useState(false);

  const nextMail = () => {
    const next = shownMails.length;
    if (next >= mailSequence.length) {
      setCompleted(true);
      return;
    }
    let fileName = mailSequence[next];
    getFile(fileName).then((data) => {
      setShownMails([...shownMails, data]);
    });
    setTime(new Date().getTime());
    setMailStates([...mailStates, null]);
    setMailScores([...mailScores, 0]);
    setCurrentMail(shownMails.length);
  };

  const setState = (val) => {
    if (mailStates[currentMail] != null) return;
    mailStates[currentMail] = val;
    setMailStates([...mailStates]);
    setMailScores([...mailScores]);
    let suspicious = document.getElementsByClassName("suspect").length;
    let phishing = suspicious > 0;
    let timeTaken = new Date().getTime() - time;
    StoreData.storeData([
      mode,
      currentMail,
      timeTaken,
      mailStates[currentMail],
      phishing,
      mailScores[currentMail],
      suspicious,
    ]);
    if (mode.toLowerCase().includes("test")) {
      nextMail();
    }
  };

  const changeScore = (val) => {
    mailScores[currentMail] = mailScores[currentMail] + val;
  };

  useEffect(() => {
    nextMail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let mail = shownMails?.at(currentMail);
  let isMCQ = mail?.includes("survey") === true;

  if (shownMails?.at(currentMail) === undefined) {
    mail = shownMails?.at(currentMail - 1);
  }

  let isTestMode = mode.toLowerCase().includes("test");

  let isTrainingContent = mail?.includes("Inlook") === true;

  if (!isMCQ) {
    EmailView({
      file: shownMails.at(currentMail),
      state: mailStates.at(currentMail),
      score: mailScores[currentMail],
      changeCount: changeScore,
      isTestMode: isTestMode,
      name: name,
    });
  }

  return (
    <div className="inbox">
      {completed && (
        <PopUp title={`You have completed ${mode}`}>
          {finishMode(nextMode)}
        </PopUp>
      )}
      <Sidebar
        shownMail={shownMails}
        setCurrentMail={setCurrentMail}
        currentMail={currentMail}
        name={name}
      />
      <div id="box-0">
        {!completed && currentMail === mailStates.length - 1 && (
          <div
            id="marking-buttons"
            style={{ display: isMCQ ? "none" : "flex" }}
          >
            {!isTrainingContent && !isMCQ && (
              <>
                <button
                  id="marking-genuine"
                  onClick={() => {
                    setState(false);
                  }}
                >
                  <img src={"g_icon.png"} alt="" id="marking-genuine-img" />
                  <span style={{ padding: "0.5em" }}>Mark as Genuine</span>
                </button>
                <button id="marking-phishing" onClick={() => setState(true)}>
                  <img src={"p_icon.png"} alt="" id="marking-phishing-img" />
                  <span style={{ padding: "0.5em" }}>Mark as Phishing</span>
                </button>
              </>
            )}
            {(mailStates.at(currentMail) != null ||
              isTrainingContent ||
              isMCQ) && (
              <button onClick={nextMail} className="temp-inbox-button">
                {" "}
                Next{" "}
              </button>
            )}
          </div>
        )}
        <div
          style={{ display: isMCQ ? "none" : "" }}
          className="emailDiv"
        ></div>
        {isMCQ && (
          <MCQ
            class
            nextMail={nextMail}
            json={JSON.parse(shownMails.at(currentMail))}
            // completed={setState}
          />
        )}
      </div>
    </div>
  );
}
