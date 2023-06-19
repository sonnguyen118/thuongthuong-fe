import React, { useState, useEffect, useRef } from "react";
import { SlidePartner } from "@components/elements/Slider";
import { TitleBlock } from "@components/elements/block";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";

interface ListPartnerProps {
  isShow: boolean;
  uderlineBlock: boolean;
  iconBlock: Array<string>;
  titleBlock: string;
  listSliderBlock: Array<string>;
}
const ListPartner: React.FC<ListPartnerProps> = (props) => {
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
      {isShow && (
        <div className="home__partner">
          <TitleBlock
            title={titleBlock}
            urlImage={iconBlock[0]}
            underlined={uderlineBlock}
          />
          <SlidePartner listSliderBlock={listSliderBlock}/>
        </div>
      )}
    </>

  );
};
export default ListPartner;
