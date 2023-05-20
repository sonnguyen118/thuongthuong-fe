import { useState, useEffect } from "react";
import { SlideProductsHome } from "@components/elements/Slider";
import { TitleProduct } from "@components/elements/block";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";

const BlockProducts = () => {
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);

  return (
    <div className="home__products">
      <TitleProduct title={t.home.HEADER3} link={"/san-pham"} />
      <SlideProductsHome />
    </div>
  );
};
export default BlockProducts;
