import { Card, Col, Row } from "antd";
import { TitleBlock } from "@components/elements/block";
import Image from "next/image";

const { Meta } = Card;
interface dataCard {
  id: string;
  urlImage: string;
  title: string;
  description: string;
}
const Principles = () => {
  const cardInformations: dataCard[] = [
    {
      id: "edc1",
      urlImage: "/images/home/image01.jpg",
      title: "Sứ mệnh",
      description:
        "ThuongThuong là doanh nghiệp xã hội của người khuyết tật, vì người khuyết tật.",
    },
    {
      id: "edc12",
      urlImage: "/images/home/image02.jpg",
      title: "Tầm nhìn",
      description:
        "ThuongThuong muốn trở thành một doanh nghiệp xã hội lớn mạnh trong ngành sáng tạo xây dựng hệ sinh thái cho người khuyết tật và cộng đồng.",
    },
    {
      id: "edc13",
      urlImage: "/images/home/image03.jpg",
      title: "Giá trị cốt lõi",
      description:
        "Chất lượng, Nhân văn, Hợp tác Sáng tạo, Văn hoá, Kết nối giá trị.",
    },
    {
      id: "edc14",
      urlImage: "/images/home/image04.jpg",
      title: "Sản phẩm",
      description:
        "Chất lượng - Độc đáo - Công năng Ưu tiên nguyên liệu địa phương, Thân thiện môi trường và dịch vụ chuyên nghiệp.",
    },
  ];
  return (
    <div className="home__principles">
      <TitleBlock
        title={"Tôn chỉ và trách nhiệm xã hội"}
        urlImage={"/images/home/iconnho03.png"}
        underlined={true}
      />

      <Row gutter={16} className="home__principles-group">
        {cardInformations && (
          <>
            {cardInformations.map((data, i) => (
              <Col
                span={6}
                className="home__principles-group-item"
                key={data.id}
              >
                <Card
                  style={{
                    boxShadow: "none",
                    border: "none",
                    borderRadius: 0,
                    textAlign: "center",
                    position: "relative",
                  }}
                  cover={
                    <div style={{ textAlign: "center" }}>
                      <Image
                        src={data.urlImage}
                        alt="example"
                        width={100}
                        height={100}
                        loading="lazy"
                        style={{
                          width: "100px",
                          height: "100px",
                          display: "block",
                          margin: "0 auto",
                          backgroundColor: "red",
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  }
                >
                  <Meta
                    style={{
                      position: "absolute",
                      top: "120px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "200px",
                    }}
                    title={data.title}
                    description={data.description}
                  />
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>
    </div>
  );
};

export default Principles;
