import { Card } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import Image from 'next/image';

type CardProps = {
  title: string;
  description: string;
  imageSrc: string;
};
const { Meta } = Card;
const CustomCard: React.FC<CardProps> = ({ title, description, imageSrc }) => {
  const datetime = "Thứ sáu, ngày 27/02/2023";
  return (
    <>
      <Card
        hoverable
        className="home__event-wrap-card"
        cover={<Image alt={title} src={imageSrc} width={300} height={300}/>}
        bordered={false}
      >
        <Meta title={title} description={description} />
        <div className="home__event-wrap-card-time">
          <ClockCircleOutlined />
          <span style={{ marginLeft: 8 }}>{datetime}</span>
        </div>
      </Card>
    </>
  );
};

export default CustomCard;
