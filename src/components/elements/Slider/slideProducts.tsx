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
interface dataProps {
  data: any;
}

const SimpleSlider: React.FC<dataProps> = (props) => {
  const { data } = props;
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
        breakpoint: 420,
        settings: {
          speed: 500,
          slidesToShow: 1.3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 620,
        settings: {
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1300,
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
        {data &&
          data.map((item :any, i:number) => (
            <div key={item.id} className="home__products-slider-item">
              <CardProduct props={item} />
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;