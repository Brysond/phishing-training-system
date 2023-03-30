//------------------------------------------------------------
import { renderToString } from "react-dom/server";
export const appendJSXtoDOM = (elementToReplace, replacement) => {
  if (!replacement) return;
  // Get html from component (only get first render)
  const replacementHTML = renderToString(replacement);
  // Parse html string into html
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(replacementHTML, "text/html");
  const replacementElement = parsedDocument.body.children[0];
  // Append replacement to DOM
  window.document.body.prepend(replacementElement);
  // Replace children with element
  elementToReplace.replaceChildren(replacementElement);
};

// w.r.t https://stackoverflow.com/questions/73508988/replace-dom-with-jsx-in-react-18

//------------------------------------------------------------
export const generateHSL = (name) => {
  const getHashOfString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
  };
  const normalizeHash = (hash, min, max) => {
    return Math.floor((hash % (max - min)) + min);
  };

  const hRange = [0, 360];
  const sRange = [40, 65];
  const lRange = [40, 50];
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, hRange[0], hRange[1]);
  const s = normalizeHash(hash, sRange[0], sRange[1]);
  const l = normalizeHash(hash, lRange[0], lRange[1]);
  return [h, s, l];
};

export const HSLtoString = (hsl) => {
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

// w.r.t https://dev.to/admitkard/auto-generate-avatar-colors-randomly-138j
