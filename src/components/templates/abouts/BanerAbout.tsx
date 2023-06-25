import { ImagesBaner } from "@components/elements/baner";

interface imageProps {
  imageUrl: string;
}
const BanerAbout: React.FC<imageProps> = (props: imageProps) => {
  const { imageUrl } = props;
  return (
    <div className="about__baner">
      <ImagesBaner urlImage={process.env.NEXT_PUBLIC_API_URL +"/"+ imageUrl} />
    </div>
  );
};

export default BanerAbout;
