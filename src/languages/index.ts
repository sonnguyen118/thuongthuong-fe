import viText from "@languages/vie.json";

const loadLanguageText = (
  lang: string,
  setText: React.Dispatch<React.SetStateAction<any>>
) => {
  switch (lang) {
    case "vi":
      import("@languages/vie.json").then((vieText) => {
        setText(vieText);
      });
      break;
    case "en":
      import("@languages/eng.json").then((engText) => {
        setText(engText);
      });
      break;
    case "por":
      import("@languages/por.json").then((porText) => {
        setText(porText);
      });
      break;
    case "fr":
      import("@languages/fre.json").then((freText) => {
        setText(freText);
      });
      break;
    default:
      setText(viText);
      break;
  }
};

export default loadLanguageText;
