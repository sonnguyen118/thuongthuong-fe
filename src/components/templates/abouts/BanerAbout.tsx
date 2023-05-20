import { ImagesBaner } from "@components/elements/baner";

const BanerAbout: React.FC = () => {
  const urlImage: string = "/images/seo.jpg";
  return (
    <div className="about__baner">
      <ImagesBaner urlImage={urlImage} />
    </div>
  );
};

export default BanerAbout;
