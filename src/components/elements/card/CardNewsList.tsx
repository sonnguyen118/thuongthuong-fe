import { Card } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
type CardProps = {
  title: string;
  description: string;
  imageSrc: string;
};

const CustomCard: React.FC<CardProps> = ({ title, description, imageSrc }) => {
  const datetime = "Thứ sáu, ngày 27/02/2023";
  return (
    <Card bordered={false}>
      <div style={{ display: "flex" }} className="home__event-list-card">
        <div className="home__event-list-card-img">
          <Image
            alt={title}
            src={imageSrc}
            width={120}
            height={120}
            loading="lazy"
          />
        </div>
        <div className="home__event-list-card-infor">
          <h3 className="home__event-list-card-infor-title">{title}</h3>
          <p className="home__event-list-card-infor-description">
            {description}
          </p>
          <div className="home__event-list-card-infor-time">
            <ClockCircleOutlined />
            <span style={{ marginLeft: 8 }}>{datetime}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomCard;
