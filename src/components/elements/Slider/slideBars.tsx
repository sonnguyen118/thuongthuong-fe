import { useRef } from "react";
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

export default function SimpleSlider() {
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
  const dataStrings: sliderData[] = [
    {
      id: "1sadsa213123",
      imageUrl:
        "https://i.ex-cdn.com/nhadautu.vn/files/content/2022/09/30/screen-shot-2022-09-30-at-061328-0614.jpg",
      title: "Ảnh nhân đạo",
      description: "Ảnh nhân đạo Ảnh nhân đạo Ảnh nhân đạo Ảnh nhân đạo",
      link: "/",
    },
    {
      id: "1sadsa2131231",
      imageUrl:
        "https://i.ex-cdn.com/nhadautu.vn/files/content/2022/09/30/screen-shot-2022-09-30-at-061328-0614.jpg",
      title: "Ảnh nhân đạo",
      description: "Ảnh nhân đạo Ảnh nhân đạo Ảnh nhân đạo Ảnh nhân đạo",
      link: "/",
    },
    {
      id: "1sadsa21312sa3",
      imageUrl:
        "https://i.ex-cdn.com/nhadautu.vn/files/content/2022/09/30/screen-shot-2022-09-30-at-061328-0614.jpg",
      title: "Ảnh nhân đạo",
      description: "Ảnh nhân đạo Ảnh nhân đạo Ảnh nhân đạo Ảnh nhân đạo",
      link: "/",
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
    <div className="home__slider">
      <div className="home__slider-btn1" onClick={previous}>
        <RightCircleOutlined className="home__slider-btn1-icon" />
      </div>
      <div className="home__slider-btn2" onClick={next}>
        <LeftCircleOutlined className="home__slider-btn2-icon" />
      </div>
      <Slider ref={slider} {...settings}>
        {dataStrings &&
          dataStrings.map((data, i) => (
            <div key={data.id}>
              <div
                className="home__slider-item"
                style={{
                  backgroundImage: `url(${data.imageUrl})`,
                  backgroundSize: "cover",
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
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
