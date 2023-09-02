import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button, InputNumber } from "antd";
import { SlideProductsHome } from "@components/elements/Slider";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
interface DataProps {
  title: string;
  data: Array<any>;
}
const ProductsSeems = (props: DataProps) => {
  const { title, data } = props;
  const [t, setText] = useState(viText);
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      loadLanguageText(lang, setText);
    } else {
      loadLanguageText("vi", setText);
    }
  }, []);
  return (
    <div className="products-seems">
      <div className="products-seems-title">{title.toUpperCase()}</div>
      <SlideProductsHome data={data} t={t} />
    </div>
  );
};
export default ProductsSeems;
