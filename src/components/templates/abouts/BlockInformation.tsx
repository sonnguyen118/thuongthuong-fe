import { useRef } from "react";
import Slider from "react-slick";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import Image from "next/image";

interface descriptionProps {
  content1: string;
  content2: string;
  content3: string;
}

interface dataSource {
  isShow: boolean;
  image: Array<string>;
  title: string;
  description: descriptionProps;
  position: boolean;
}

const BlockInformation: React.FC<dataSource> = ({
  isShow, image, title, description, position
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
    <>
    {
      isShow && (
      <div className="about__block">
        <div className="about__block-image" style={{ order:  position ? 2 : 1}}>
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
                  src={process.env.NEXT_PUBLIC_API_URL +"/"+ data}
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
          style={{ order: position ? 1 : 2 }}
        >
          <h3 className="about__block-information-title">{title}</h3>
          <p className="about__block-information-description">{description.content1}</p>
          <p className="about__block-information-description">{description.content2}</p>
          <p className="about__block-information-description">{description.content3}</p>
        </div>
      </div>
    )
    }
    </>
  );
};

export default BlockInformation;
