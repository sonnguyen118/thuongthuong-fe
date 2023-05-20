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

export default function SlidePartner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  const dataStrings: sliderData[] = [
    {
      id: "1sadsa213123",
      imageUrl:
        "https://i.ex-cdn.com/nhadautu.vn/files/content/2022/09/30/screen-shot-2022-09-30-at-061328-0614.jpg",
      title: "Ảnh nhân đạo",
    },
    {
      id: "1sadsa2131231",
      imageUrl:
        "https://i.ex-cdn.com/nhadautu.vn/files/content/2022/09/30/screen-shot-2022-09-30-at-061328-0614.jpg",
      title: "Ảnh nhân đạo",
    },
    {
      id: "1sadsa21312sa3",
      imageUrl:
        "https://i.ex-cdn.com/nhadautu.vn/files/content/2022/09/30/screen-shot-2022-09-30-at-061328-0614.jpg",
      title: "Ảnh nhân đạo",
    },
    {
      id: "1sadsa21312sa3",
      imageUrl:
        "https://i.ex-cdn.com/nhadautu.vn/files/content/2022/09/30/screen-shot-2022-09-30-at-061328-0614.jpg",
      title: "Ảnh nhân đạo",
    },
    {
      id: "1sadsa21312sa3",
      imageUrl:
        "https://i.ex-cdn.com/nhadautu.vn/files/content/2022/09/30/screen-shot-2022-09-30-at-061328-0614.jpg",
      title: "Ảnh nhân đạo",
    },
    {
      id: "1sadsa21312sa3",
      imageUrl:
        "https://i.ex-cdn.com/nhadautu.vn/files/content/2022/09/30/screen-shot-2022-09-30-at-061328-0614.jpg",
      title: "Ảnh nhân đạo",
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
    <div className="home__partner-slider">
      <div className="home__partner-slider-btn1" onClick={previous}>
        <RightCircleOutlined className="home__partner-slider-btn1-icon" />
      </div>
      <div className="home__partner-slider-btn2" onClick={next}>
        <LeftCircleOutlined className="home__partner-slider-btn2-icon" />
      </div>
      <Slider ref={slider} {...settings}>
        {dataStrings &&
          dataStrings.map((data, i) => (
            <div key={data.id} className="home__partner-slider-item">
              <Image
                src="/images/home/partner.png"
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
}
