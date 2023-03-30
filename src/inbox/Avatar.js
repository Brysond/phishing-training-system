import { HSLtoString, generateHSL } from "./utility";

function getNameTag(name) {
  let nameArray = name
    .trim()
    .split(" ")
    .map((n) => n[0]);

  if (nameArray.length > 2)
    nameArray = nameArray[0] + nameArray[nameArray.length - 1];
  else nameArray = nameArray.join("");
  let initials = nameArray.toUpperCase();
  if (!/[a-z]/i.test(initials)) initials = "I";
  return initials;
}

const Avatar = ({ name, size }) => {
  return (
    <div
      className="avatar"
      style={{
        backgroundColor: HSLtoString(generateHSL(name)),
      }}
    >
      {getNameTag(name)}
    </div>
  );
};

Avatar.defaultProps = {
  name: "Inlook",
  size: "0.2em",
};

export default Avatar;
