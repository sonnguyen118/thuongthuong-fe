import React, { useState, useEffect } from "react";
import { store } from "@store";
import viText from "@languages/vie.json";
import { Image } from "antd";
import { Button, InputNumber } from "antd";
import loadLanguageText from "@languages";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@slices/cartSlice";
import { useRouter } from "next/router";

export interface ProductsDetail {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  content: string;
  description: string;
  categoryName: string;
  categoryLink: string;
  category: any;
}
const ProductsDetails = (props: any) => {
  const [t, setText] = useState(viText);
  const dispatch = useDispatch();
  const router = useRouter();
  const [productDetail, setProductDetail] = useState<ProductsDetail>();

  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
    if (props?.data) {
      setProductDetail(props?.data);
    }
  }, [lang, props]);
  const [value, setValue] = useState(1);
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const handleOnChange = (newValue: number | null) => {
    if (newValue === null) {
      setValue(1);
    } else {
      setValue(newValue);
    }
  };
  // mua ngay
  const handlePayNow = () => {
    if (productDetail) {
      const item = {
        id: productDetail.id,
        imageUrl: productDetail.imageUrl,
        title: productDetail.title,
        price: 0,
        quantity: 1,
        selected: true,
      };
      dispatch(cartActions.addItemToCart(item));
      router.push("/gio-hang");
    }
  };

  const handleAddCart = () => {
    if (productDetail) {
      const item = {
        id: productDetail.id,
        imageUrl: productDetail.imageUrl,
        title: productDetail.title,
        price: 0,
        quantity: 1,
        selected: false,
      };
      dispatch(cartActions.addItemToCart(item));
    }
  };
  return (
    <div className="products">
      <div className="products-image">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${productDetail?.imageUrl}`}
          alt={productDetail?.title}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
      <div className="products-detail">
        <h1 className="products-detail-title">{productDetail?.title}</h1>
        {/* <div className='products-detail-category'>
          {t.products.CATEGORY}:{' '}
          <span className='products-detail-category-text'>
            {productDetail?.category.name}
          </span>
        </div> */}
        <div className="products-detail-price">{t.products.PRICE}</div>
        <div
          className="products-detail-selector"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="products-detail-selector-text">
            {t.products.QUANTITY}
          </div>
          <Button onClick={() => handleOnChange(value - 1)}>-</Button>
          <InputNumber
            defaultValue={1}
            min={1}
            max={10}
            value={value}
            onChange={handleOnChange}
            style={{ margin: "0 0.2em" }}
          />
          <Button onClick={() => handleOnChange(value + 1)}>+</Button>
        </div>
        <div className="products-detail-group">
          <div className="products-detail-group-btn" onClick={handlePayNow}>
            {t.button.BUTTON4}
          </div>
          <div className="products-detail-group-btn" onClick={handleAddCart}>
            {t.button.BUTTON5}
          </div>
        </div>
        <div className="products-detail-description">
          <div className="products-detail-description-title">
            {t.products.DES_TITLE}
          </div>
          <div className="products-detail-description-body">
            {expanded ? (
              <>
                <span className="products-detail-description-body-hide">
                  {productDetail?.description}
                </span>
                <span
                  className="products-detail-description-body-btn"
                  onClick={toggleExpanded}
                >
                  {t.button.BUTTON1}
                </span>
              </>
            ) : (
              <>
                <span className="products-detail-description-body-show">
                  {productDetail?.description}
                </span>
                <span
                  className="products-detail-description-body-btn"
                  onClick={toggleExpanded}
                >
                  {t.button.BUTTON2}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsDetails;
