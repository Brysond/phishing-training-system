import SidebarEmail from "./SidebarEmail";
export const processMail = (mail, name) => {
  if (mail.includes("survey")) {
    let json = JSON.parse(mail);
    return {
      sender: "Inlook",
      subject: json.title,
      message: json.description.substring(0, 40),
    };
  }
  var doc = new DOMParser().parseFromString(mail, "text/html");
  let spans = doc.getElementsByTagName("span");
  let mailBody = "";
  for (var span of spans) {
    mailBody += span.textContent + " ";
  }

  return {
    sender: doc.querySelector(".email-sender").childNodes[0].textContent,
    subject: doc
      .getElementsByClassName("email-subject")[0]
      .textContent.substring(0, 40),
    message: mailBody.replace("[persons_name]", name).substring(0, 40),
  };
};

export default function Sidebar({
  currentMail,
  shownMail,
  setCurrentMail,
  name,
}) {
  return (
    <div className="client-list">
      {shownMail
        .map((mail, i) => (
          <SidebarEmail
            key={i}
            mailNumber={i}
            active={i === currentMail}
            {...processMail(mail, name)}
            setCurrentMail={setCurrentMail}
          />
        ))
        .reverse()}
    </div>
  );
}
