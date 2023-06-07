import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { CardProduct } from "@components/elements/card";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
interface sliderData {
  id: number;
  imageUrl: string;
  title: string;
  link: string;
  price: number;
}

export default function SimpleSlider() {
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1281,
        settings: {
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  const dataStrings = [
    {
      id: 1,
      imageUrl: "/images/products.jpg",
      title: `${t.products.TITLE1}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 10,
    },
    {
      id: 2,
      imageUrl: "/images/thuongthuong-sanpham-01.jpg",
      title: `${t.products.TITLE2}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 10,
    },
    {
      id: 3,
      imageUrl: "/images/thuongthuong-sanpham-02.jpeg",
      title: `${t.products.TITLE3}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 10,
    },
    {
      id: 4,
      imageUrl: "/images/thuongthuong-sanpham-03.jpeg",
      title: `${t.products.TITLE4}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 10,
    },
    {
      id: 5,
      imageUrl: "/images/thuongthuong-sanpham-04.jpg",
      title: `${t.products.TITLE5}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 10,
    },
    {
      id: 6,
      imageUrl: "/images/thuongthuong-sanpham-05.jpg",
      title: `${t.products.TITLE6}`,
      link: "/chi-tiet-san-pham/tranh-cuon-giay",
      price: 0,
    },
  ];
  const slider = useRef<Slider>(null);

  const next = () => {
    slider.current?.slickNext();
  };

  const previous = () => {
    slider.current?.slickPrev();
  };

  return (
    <div className="home__products-slider">
      <div className="home__products-slider-btn1" onClick={previous}>
        <RightCircleOutlined className="home__products-slider-btn1-icon" />
      </div>
      <div className="home__products-slider-btn2" onClick={next}>
        <LeftCircleOutlined className="home__products-slider-btn2-icon" />
      </div>
      <Slider ref={slider} {...settings}>
        {dataStrings &&
          dataStrings.map((data, i) => (
            <div key={data.id} className="home__products-slider-item">
              <CardProduct props={data} />
            </div>
          ))}
      </Slider>
    </div>
  );
}
