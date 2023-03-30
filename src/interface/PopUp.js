import "./Interface.css";

export default function PopUp({ title, children }) {
  return (
    <div id="pop-up">
      <div id="page-mask"></div>
      <div id="pop-up-container">
        <h1 id="pop-up-title">{title}</h1>
        <div id="pop-up-content">{children}</div>
      </div>
    </div>
  );
}
