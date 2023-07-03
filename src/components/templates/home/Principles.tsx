import { Card, Col, Row } from "antd";
import { TitleBlock } from "@components/elements/block";
import Image from "next/image";

const { Meta } = Card;
interface dataCard {
  id: number;
  urlImage: string;
  title: string;
  description: string;
}
const Principles = () => {
  const cardInformations: dataCard[] = [
    {
      id: 1,
      urlImage: "https://www.kymviet.com.vn/iconnho03.png",
      title: "Sứ mệnh",
      description:
        "ThuongThuong là doanh nghiệp xã hội của người khuyết tật, vì người.",
    },
    {
      id: 2,
      urlImage: "https://www.kymviet.com.vn/iconnho01iconnho-oohzlgvm9x936kzivkl0bfy6lxpxjb3wv954wj9tv8.png",
      title: "Tầm nhìn",
      description:
        "ThuongThuong muốn trở thành một doanh nghiệp xã hội lớn mạnh trong ngành sáng tạo cộng đồng.",
    },
    {
      id: 3,
      urlImage: "https://www.kymviet.com.vn/kymviet/iconnho06iconnho-ooi2nmkp7y1ttez4mos0157wukrimbfgchiomxxuno.png",
      title: "Giá trị cốt lõi",
      description:
        "Chất lượng, Nhân văn, Hợp tác Sáng tạo, Văn hoá, Kết nối giá trị.",
    }
  ];
  return (
    <div className="home__principles">
      {cardInformations.map((data, index)=> (
        <div className={data.id !== 2 ?"home__principles-block":"home__principles-block-active"} key={data.id}>
          {/* <Image src={data.urlImage} width={30} height={30} alt={"thuongthuong"} className={data.id !== 2 ?"home__principles-block-img":"home__principles-block-active-img"}/> */}
          <h2 className={data.id !== 2 ?"home__principles-block-title":"home__principles-block-active-title"}>{data.title}</h2>
          <h3 className={data.id !== 2 ?"home__principles-block-description":"home__principles-block-active-description"}>{data.description}</h3>
        </div>
      ))}
    </div>
  );
};

export default Principles;
