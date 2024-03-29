import { useState, useEffect } from "react";
import { SlideProductsHome } from "@components/elements/Slider";
import { TitleProduct } from "@components/elements/block";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";

interface BlockProductsProps {
  dataProductHighlight: any;
  dataListProducts: any;
  t: any;
}

const BlockProducts: React.FC<BlockProductsProps> = (props) => {
  const { dataProductHighlight, dataListProducts, t } = props;

  return (
    <div className="home__products">
      <TitleProduct title={t.home.HEADER3} link={"/san-pham"} t={t} />
      <SlideProductsHome data={dataProductHighlight} t={t} />
      {dataListProducts && (
        <>
          {dataListProducts.map((data: any, index: number) => (
            <div key={index}>
              <TitleProduct
                title={data.category.name}
                link={"/san-pham/" + data.category.link}
                t={t}
              />
              <SlideProductsHome data={data.products} t={t} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default BlockProducts;
