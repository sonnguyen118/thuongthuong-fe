import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import Image from "next/image";
import { Button, InputNumber } from "antd";
import { SlideProductsHome } from "@components/elements/Slider";
import { CkeditorDisable } from "@components/molecules/ckeditor";


interface DataProps {
  data : string
}
const ProductsContent = (props :DataProps) => {
  const { data } = props;
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );

  return (
    <div className="products-seems">
      <div className="products-seems-title">{t.products.HEADER2}</div>
      <CkeditorDisable data={data} />
    </div>
  );
};
export default ProductsContent;
