import React, { useRef } from "react";
import Slider from "react-slick";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

interface dataSliderProps {
  content: string;
  image: Array<string>;
  isShow: boolean;
  link: string;
  title: string;
}
interface SliderProps {
  isShow: boolean;
  dataSlider: Array<any>;
  t: any;
}

const SimpleSlider: React.FC<SliderProps> = (props) => {
  const { isShow, dataSlider, t } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => (
      <div>
        <ul style={{ margin: "0px", padding: "0px" }}> {dots} </ul>
      </div>
    ),
  };
  const slider = useRef<Slider>(null);

  const next = () => {
    slider.current?.slickNext();
  };

  const previous = () => {
    slider.current?.slickPrev();
  };
  return (
    <div className="home__slider">
      {isShow && (
        <>
          <div className="home__slider-btn1" onClick={previous}>
            <RightCircleOutlined className="home__slider-btn1-icon" />
          </div>
          <div className="home__slider-btn2" onClick={next}>
            <LeftCircleOutlined className="home__slider-btn2-icon" />
          </div>
          <Slider ref={slider} {...settings}>
            {dataSlider &&
              dataSlider.map((data: dataSliderProps, i: number) => (
                <div key={i} style={{ position: "relative" }}>
                  <img
                    className="home__slider-item"
                    src={process.env.NEXT_PUBLIC_API_URL + "/" + data.image[0]}
                    style={{
                      objectFit: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></img>
                  <div className="home__slider-item-wrap">
                    <h2 className="home__slider-item-wrap-title">
                      {data.title}
                    </h2>
                    <h3 className="home__slider-item-wrap-description">
                      {data.content}
                    </h3>
                    {data.link && (
                      <Button
                        type="primary"
                        className="home__slider-item-wrap-btn"
                      >
                        <Link href={data.link}>{t.home.SLIDER}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </Slider>
        </>
      )}
    </div>
  );
};
export default SimpleSlider;
