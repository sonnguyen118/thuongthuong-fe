import { useState, useEffect, useRef } from "react";
import Slider, { Settings } from "react-slick";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Image } from "antd";
interface sliderData {
  id: string;
  imageUrl: string;
}

export default function SliderSync() {
  // dữ liệu data
  const dataSlider: sliderData[] = [
    {
      id: "1",
      imageUrl: "/images/home/slider/Screen1.png",
    },
    {
      id: "2",
      imageUrl: "/images/home/slider/Screen2.png",
    },
    {
      id: "3",
      imageUrl: "/images/home/slider/Screen3.png",
    },
    {
      id: "4",
      imageUrl: "/images/home/slider/Screen4.png",
    },
    {
      id: "5",
      imageUrl: "/images/home/slider/Screen5.png",
    },
    {
      id: "6",
      imageUrl: "/images/home/slider/Screen6.png",
    },
    {
      id: "31c27",
      imageUrl: "/images/home/slider/Screen7.png",
    },
    {
      id: "31c271",
      imageUrl: "/images/home/slider/Screen7.png",
    },
    {
      id: "31c272",
      imageUrl: "/images/home/slider/Screen7.png",
    },
    {
      id: "31c273",
      imageUrl: "/images/home/slider/Screen7.png",
    },
    {
      id: "31c274",
      imageUrl: "/images/home/slider/Screen7.png",
    },
  ];
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
          {dataSlider.map((data, i) => (
            <div
              key={data.id}
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
                  backgroundImage: `url(${data.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                src={data.imageUrl}
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
          {dataSlider.map((data, i) => (
            <div
              key={data.id}
              className="home__listproducts-slider-small-item-wrap"
            >
              <div
                className="home__listproducts-slider-small-item"
                style={{
                  backgroundImage: `url(${data.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
