import React, { useState, useEffect, useRef } from "react";
import { SlideBarsImageProductsHome } from "@components/elements/Slider";
import { TitleBlock } from "@components/elements/block";
// language
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";

interface ListProductsProps {
  isShow: boolean;
  uderlineBlock: boolean;
  iconBlock: Array<string>;
  titleBlock: string;
  listSliderBlock: Array<string>;
}

const ListProducts: React.FC<ListProductsProps> = (props) => {
  const { isShow, uderlineBlock, iconBlock, titleBlock, listSliderBlock } = props;
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  return (
    <>
      {isShow && <div className="home__listproducts">
        <TitleBlock
          title={titleBlock}
          urlImage={iconBlock[0]}
          underlined={uderlineBlock}
        />
        <SlideBarsImageProductsHome listSlider={listSliderBlock}/>
      </div>}
    </>

  );
};
export default ListProducts;
