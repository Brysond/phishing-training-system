import Avatar from "./Avatar";

export default function SidebarEmail({
  active,
  mailNumber,
  sender,
  subject,
  message,
  setCurrentMail,
}) {
  return (
    <div
      className="sidebar-email"
      onClick={() => setCurrentMail(mailNumber)}
      // style={active ? { backgroundColor: "#E1EAF6" } : null}
    >
      <div
        className="sidebar-active-indicator"
        style={active ? { opacity: 1 } : null}
      ></div>
      <div className="sidebar-pfp-container">
        <Avatar name={sender} />
      </div>
      <div className="sidebar-email-info">
        <div className="sidebar-email-sender">{sender}</div>
        <div className="sidebar-email-subject">{subject}</div>
        <div className="sidebar-email-message">{message}</div>
      </div>
    </div>
  );
}
