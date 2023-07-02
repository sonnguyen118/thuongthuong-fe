import React, { useState, useEffect, useRef } from "react";
import Slider, { Settings } from "react-slick";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Image } from "antd";
import ListProducts from "../../templates/home/ListProducts";
interface sliderData {
  id: string;
  imageUrl: string;
}
interface listSliderProps {
  listSlider: Array<string>;
}
const SliderSync: React.FC<listSliderProps> = (props) => {
  const { listSlider } = props;
  // dữ liệu data

  const slider1Ref = useRef<Slider>(null);
  const slider2Ref = useRef<Slider>(null);
  const [nav1, setNav1] = useState<Slider | undefined>(undefined);
  const [nav2, setNav2] = useState<Slider | undefined>(undefined);
  const next1 = () => {
    slider1Ref.current?.slickNext();
  };
  const previous1 = () => {
    slider1Ref.current?.slickPrev();
  };
  const next2 = () => {
    slider2Ref.current?.slickNext();
  };
  const previous2 = () => {
    slider2Ref.current?.slickPrev();
  };
  useEffect(() => {
    setNav1(slider1Ref.current as Slider);
    setNav2(slider2Ref.current as Slider);
  }, []);

  const settings1: Settings = {
    asNavFor: nav2,
    beforeChange: () => {
      console.log("slider1 before change");
    },
  };

  const settings2: Settings = {
    asNavFor: nav1,
    slidesToShow: 10,
    swipeToSlide: true,
    focusOnSelect: true,
    beforeChange: () => {
      console.log("slider2 before change");
    },
  };

  return (
    <div className="home__listproducts-slider">
      <div className="home__listproducts-slider-big">
        <div className="home__listproducts-slider-big-btn1" onClick={previous1}>
          <RightCircleOutlined className="home__listproducts-slider-big-btn1-icon" />
        </div>
        <div className="home__listproducts-slider-big-btn2" onClick={next1}>
          <LeftCircleOutlined className="home__listproducts-slider-big-btn2-icon" />
        </div>
        <Slider {...settings1} ref={slider1Ref}>
          {listSlider.map((data, i) => (
            <div
              key={i}
              className="home__listproducts-slider-big-item-wrap"
            >
              {/* <div
                className="home__listproducts-slider-big-item"
                style={{
                  backgroundImage: `url(${data.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div> */}
              <Image
                className="home__listproducts-slider-big-item"
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL + "/" + data})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                src={process.env.NEXT_PUBLIC_API_URL + "/" +data}
                alt="Thương Thương"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="home__listproducts-slider-small">
        <div
          className="home__listproducts-slider-small-btn1"
          onClick={previous2}
        >
          <RightCircleOutlined className="home__listproducts-slider-small-btn1-icon" />
        </div>
        <div className="home__listproducts-slider-small-btn2" onClick={next2}>
          <LeftCircleOutlined className="home__listproducts-slider-small-btn2-icon" />
        </div>
        <Slider {...settings2} ref={slider2Ref}>
          {listSlider.map((data, i) => (
            <div
              key={i}
              className="home__listproducts-slider-small-item-wrap"
            >
              <img
                className="home__listproducts-slider-small-item"
                src={process.env.NEXT_PUBLIC_API_URL +"/"+ data}
                style={{
                  objectFit: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
              </img>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
export default SliderSync;