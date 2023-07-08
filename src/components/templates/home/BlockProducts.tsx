import { useState, useEffect } from "react";
import { SlideProductsHome } from "@components/elements/Slider";
import { TitleProduct } from "@components/elements/block";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";

interface BlockProductsProps {
  dataProductHighlight: any;
  dataListProducts: any;
};

const BlockProducts: React.FC<BlockProductsProps> = (props) => {
  const { dataProductHighlight, dataListProducts } = props;
  console.log(dataProductHighlight, "dataProductHighlight");
  console.log(dataListProducts, "dataListProducts");
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);

  return (
    <div className="home__products">
      <TitleProduct title={t.home.HEADER3} link={"/san-pham"} />
      <SlideProductsHome data={dataProductHighlight}/>
      {dataListProducts && 
      <>
      {dataListProducts.map((data:any, index:number)=> (
        <div key={index}>
        <TitleProduct title={data.category.name} link={"/san-pham/"+ data.category.link} />
        <SlideProductsHome data={data.products}/>
        </div>
      ))}
      </>
      }
    </div>
  );
};
export default BlockProducts;
