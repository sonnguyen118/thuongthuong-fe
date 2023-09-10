import { useRef } from "react";
import Slider from "react-slick";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { CardProduct } from "@components/elements/card";
import Image from "next/image";
interface sliderData {
  id: string;
  imageUrl: string;
  title: string;
}
interface SlidePartnerProps {
  listSliderBlock: Array<string>;
}
const SlidePartner: React.FC<SlidePartnerProps> = (props) => {
  const { listSliderBlock } = props;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 420,
        settings: {
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 620,
        settings: {
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
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
    <div className="home__partner-slider">
      <div className="home__partner-slider-btn1" onClick={previous}>
        <RightCircleOutlined className="home__partner-slider-btn1-icon" />
      </div>
      <div className="home__partner-slider-btn2" onClick={next}>
        <LeftCircleOutlined className="home__partner-slider-btn2-icon" />
      </div>
      <Slider ref={slider} {...settings}>
        {listSliderBlock &&
          listSliderBlock.map((data, i) => (
            <div key={i} className="home__partner-slider-item">
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + "/" + data}
                alt="ThuongThuong"
                width={120}
                height={120}
                loading="lazy"
                className="home__partner-slider-img"
                style={{ display: "block", margin: "0 auto" }}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};
export default SlidePartner;
