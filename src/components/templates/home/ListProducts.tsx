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
  t: any;
}

const ListProducts: React.FC<ListProductsProps> = (props) => {
  const { isShow, uderlineBlock, iconBlock, titleBlock, listSliderBlock, t } =
    props;

  return (
    <>
      {isShow && (
        <div className="home__listproducts">
          <TitleBlock
            title={titleBlock}
            urlImage={iconBlock[0]}
            underlined={uderlineBlock}
          />
          <SlideBarsImageProductsHome listSlider={listSliderBlock} />
        </div>
      )}
    </>
  );
};
export default ListProducts;
