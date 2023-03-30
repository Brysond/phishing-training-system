import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import StoreData from "../StoreData";

export default function MCQ({ nextMail, json }) {
  const survey = new Model(json);
  // change colour theme to red

  survey.onComplete.add((sender, options) => {
    survey.mode = "display";
    var data = [];
    let choices = document.getElementsByClassName("sd-selectbase");

    survey.getAllQuestions().forEach((q, i) => {
      data[q.getValueName()] = q.value;
      // set the background color for the correct option to green
      let choice = choices[i].children;

      q.choices.forEach((c, i) => {
        if (c.value === q.value && c.value !== q.correctAnswer) {
          choice[i].style.backgroundColor = "salmon";
        } else if (c.value === q.correctAnswer) {
          choice[i].style.backgroundColor = "lightgreen";
        }
      });
    });

    survey.clear();
    survey.data = data;
    document.getElementById("marking-buttons").style.display = "block";
    StoreData.storeKeyValue(json.title, JSON.stringify(sender.data));
  });

  let storedData = StoreData.getValue(json.title);
  if (storedData !== null) {
    survey.data = JSON.parse(storedData);
    survey.mode = "display";
  }

  return (
    <div id="survey">
      <Survey model={survey} />;
    </div>
  );
}
