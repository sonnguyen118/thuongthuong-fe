import { useState, useEffect, useRef } from "react";
import { SlidePartner } from "@components/elements/Slider";
import { TitleBlock } from "@components/elements/block";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";

const ListPartner = () => {
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  return (
    <div className="home__partner">
      <TitleBlock
        title={t.home.HEADER5}
        urlImage={"/images/home/iconnho021.png"}
        underlined={true}
      />
      <SlidePartner />
    </div>
  );
};
export default ListPartner;
