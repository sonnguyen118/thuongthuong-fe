import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import { CardProduct } from "@components/elements/card";

interface sliderData {
  id: number;
  imageUrl: string;
  title: string;
  link: string;
  price: number;
}

const ListProducts = () => {
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  const dataStrings: sliderData[] = [
    {
      id: 1,
      imageUrl: "/images/products.jpg",
      title: `${t.products.TITLE1}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 0,
    },
    {
      id: 2,
      imageUrl: "/images/thuongthuong-sanpham-01.jpg",
      title: `${t.products.TITLE2}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 0,
    },
    {
      id: 3,
      imageUrl: "/images/thuongthuong-sanpham-02.jpeg",
      title: `${t.products.TITLE3}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 0,
    },
    {
      id: 4,
      imageUrl: "/images/thuongthuong-sanpham-03.jpeg",
      title: `${t.products.TITLE4}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 0,
    },
    {
      id: 5,
      imageUrl: "/images/thuongthuong-sanpham-04.jpg",
      title: `${t.products.TITLE5}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 0,
    },
    {
      id: 6,
      imageUrl: "/images/thuongthuong-sanpham-05.jpg",
      title: `${t.products.TITLE6}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 0,
    },
  ];
  return (
    <div className="list-products-right">
      <div className="list-products-right-title">{t.list_products.TITLE1}</div>
      <div className="list-products-right-wrap">
        {dataStrings.map((data, index) => (
          <div className="list-products-right-wrap-item" key={index}>
            <CardProduct props={data} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListProducts;
