import React, { useRef } from "react";
import Slider from "react-slick";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
interface sliderData {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  link: string;
}
interface SliderProps {
  isShow: boolean;
  dataSlider: Array<any>
}

const SimpleSlider: React.FC<SliderProps> = ( props) => {
  const { isShow, dataSlider } = props;
  console.log(dataSlider, "dataSlider")
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
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
              dataSlider.map((data:string, i:number) => (
                <div key={i}>
                  <img
                    className="home__slider-item"
                    src={process.env.NEXT_PUBLIC_API_URL +"/"+ data}
                    style={{
                      objectFit: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* <div className="home__slider-item-wrap">
                  <h2 className="home__slider-item-wrap-title">{data.title}</h2>
                  <h3 className="home__slider-item-wrap-description">
                    {data.description}
                  </h3>
                  <Button type="primary" className="home__slider-item-wrap-btn">
                    <Link href={data.link}>Xem thêm chi tiết</Link>
                  </Button>
                </div> */}
                  </img>
                </div>
              ))}
          </Slider>
        </>
      )}

    </div>
  );
}
export default SimpleSlider;
