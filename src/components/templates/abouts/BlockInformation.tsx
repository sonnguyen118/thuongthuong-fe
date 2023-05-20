import { useRef } from "react";
import Slider from "react-slick";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import Image from "next/image";

interface positionProps {
  image: number;
  block: number;
}

interface dataSource {
  image: Array<string>;
  title: string;
  description: string;
  position: positionProps;
}

const BlockInformation: React.FC<dataSource> = ({
  image,
  title,
  description,
  position,
}) => {
  console.log(image);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const slider = useRef<Slider>(null);
  const next = () => {
    slider.current?.slickNext();
  };
  const previous = () => {
    slider.current?.slickPrev();
  };
  return (
    <div className="about__block">
      <div className="about__block-image" style={{ order: position.image }}>
        {image.length > 1 && (
          <>
            <div className="about__block-image-btn1" onClick={previous}>
              <RightCircleOutlined />
            </div>
            <div className="about__block-image-btn2" onClick={next}>
              <LeftCircleOutlined />
            </div>
          </>
        )}

        <Slider ref={slider} {...settings}>
          {image &&
            image.map((data, i) => (
              <Image
                key={i}
                src={data}
                alt="Thương Thương Giới thiệu"
                className="about__block-image-item"
                width={500}
                height={500}
              />
            ))}
        </Slider>
      </div>
      <div
        className="about__block-information"
        style={{ order: position.block }}
      >
        <h3 className="about__block-information-title">{title}</h3>
        <p className="about__block-information-description">{description}</p>
      </div>
    </div>
  );
};

export default BlockInformation;
