import { useState, useEffect, useRef } from "react";
import { SlideBarsImageProductsHome } from "@components/elements/Slider";
import { TitleBlock } from "@components/elements/block";
// language
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";

const ListProducts = () => {
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  return (
    <div className="home__listproducts">
      <TitleBlock
        title={t.home.HEADER2}
        urlImage={"/images/home/iconnho021.png"}
        underlined={false}
      />
      <SlideBarsImageProductsHome />
    </div>
  );
};
export default ListProducts;
