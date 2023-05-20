import Image from "next/image";

interface ImagesProps {
  urlImage: string;
}
const ImagesBaner: React.FC<ImagesProps> = ({ urlImage }) => {
  return (
    <Image
      src={urlImage}
      alt="ThuongThuong"
      width={80}
      height={80}
      loading="lazy"
      style={{ objectFit: "cover", width: "100%", height: "100%" }}
    />
  );
};

export default ImagesBaner;
