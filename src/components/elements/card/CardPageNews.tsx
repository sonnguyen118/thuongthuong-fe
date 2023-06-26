import { Card } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
  time: string;
};
const { Meta } = Card;
const CardPageNews: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  link,
  time,
}) => {
  return (
    <Link href={"/tin-tuc/"+link} passHref>
      <Card
        hoverable
        className="list-news-item-card"
        cover={
          <Image
            alt={title}
            src={imageSrc}
            width={300}
            height={300}
            className="list-news-item-card-img"
          />
        }
        bordered={false}
      >
        <Meta title={title} description={description} />
        <div className="list-news-item-card-time">
          <ClockCircleOutlined />
          <span style={{ marginLeft: 8 }}>{time}</span>
        </div>
      </Card>
    </Link>
  );
};

export default CardPageNews;
