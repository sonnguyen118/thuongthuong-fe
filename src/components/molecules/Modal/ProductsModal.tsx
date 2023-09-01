import React, { useState, useEffect } from "react";
import { Button, InputNumber, Spin } from "antd";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@slices/cartSlice";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
interface CardProductProps {
  id: number;
  imageUrl: string;
  title: string;
  link: string;
  price: number;
  name: string;
};

const ProductsModal: React.FC<{ props: CardProductProps, dataDetailProduct: any }> = ({ props, dataDetailProduct }) => {
  const { id, title, imageUrl, name, link, price } = props;
  const imageUrlProduct = `${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`;
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();
  const handleOnChange = (newValue: number | null) => {
    if (newValue === null) {
      setValue(1);
    } else {
      setValue(newValue);
    }
  };
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const handleAddItem = () => {
    const item = {
      id: id,
      imageUrl: imageUrlProduct,
      title: title,
      price: price,
      quantity: 1,
      selected: false,
    };
    dispatch(cartActions.addItemToCart(item));
  };
  return (
    <div className="products__card-dialog--wrap">
      <Image
        src={imageUrl ? imageUrlProduct : ""}
        alt="example"
        className="products__card-dialog--wrap-image"
        width={300}
        height={300}
      />
      {dataDetailProduct ? (
        <div className="products__card-dialog--wrap-information">
        <div className="products__card-dialog--wrap-information-title">
          {dataDetailProduct.name}
        </div>
        <div className="products__card-dialog--wrap-information-category">
          {dataDetailProduct.danhMuc1.name}  {dataDetailProduct.danhMuc2.name}
        </div>
        <div className="products__card-dialog--wrap-information-price">
          {!price ? `${t.products.PRICE}` : price}
        </div>
        <div className="products__card-dialog--wrap-information-description">
          {expanded ? (
            <>
              <span className="products__card-dialog--wrap-information-description-hide">
                {dataDetailProduct.description}
              </span>
              <span
                className="products__card-dialog--wrap-information-description-button"
                onClick={toggleExpanded}
              >
                {t.button.BUTTON1}
              </span>
            </>
          ) : (
            <>
              <span className="products__card-dialog--wrap-information-description-show">
              {dataDetailProduct.description}
              </span>
              <span
                className="products__card-dialog--wrap-information-description-button"
                onClick={toggleExpanded}
              >
                {t.button.BUTTON2}
              </span>
            </>
          )}
        </div>
        <div className="products__card-dialog--wrap-information-sub">
          {t.products.SUB}
        </div>
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="products__card-dialog--wrap-information-inputnumber"
        >
          <Button
            onClick={() => handleOnChange(value - 1)}
            className="products__card-dialog--wrap-information-inputnumber-btn"
          >
            <span className="products__card-dialog--wrap-information-inputnumber-btn-icon">
              -
            </span>
          </Button>
          <InputNumber
            defaultValue={1}
            min={1}
            max={100}
            value={value}
            onChange={handleOnChange}
            className="products__card-dialog--wrap-information-inputnumber-main"
            style={{ margin: "0 0.2em" }}
          />
          <Button
            onClick={() => handleOnChange(value + 1)}
            className="products__card-dialog--wrap-information-inputnumber-btn"
          >
            <span className="products__card-dialog--wrap-information-inputnumber-btn-icon">
              +
            </span>
          </Button>
        </div>
        <div className="products-detail-group">
          <Button
            type="primary"
            style={{ marginLeft: 0 }}
            onClick={handleAddItem}
            className="products__card-dialog--wrap-information-btn"
          >
            {t.button.BUTTON4}
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 16 }}
            onClick={handleAddItem}
            className="products__card-dialog--wrap-information-btn"
          >
            {t.button.BUTTON5}
          </Button>
        </div>
      </div>
      ):(
        <Spin />
      )}
      
    </div>
  );
};

export default ProductsModal;
