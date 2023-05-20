import Image from "next/image";

interface TitleBlockProps {
  title: string;
  urlImage: string;
  underlined: boolean;
}
const TitleBlock: React.FC<TitleBlockProps> = ({
  title,
  urlImage,
  underlined,
}) => {
  return (
    <div className="home__title">
      <Image
        src={urlImage}
        alt="ThuongThuong"
        width={80}
        height={80}
        loading="lazy"
      />
      <h2 className="home__title-text">{title}</h2>
      {underlined && <div className="home__title-wall"></div>}
    </div>
  );
};

export default TitleBlock;
