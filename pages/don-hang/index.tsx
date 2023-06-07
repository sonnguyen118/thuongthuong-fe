import React, { useState, useEffect } from "react";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { NavigationTopBar } from "@components/elements/navigation";
import { ProductsSeems } from "@components/templates/products";
import { DeleteOutlined, WarningOutlined } from "@ant-design/icons";
// sử dụng redux
import { useSelector, useDispatch } from "react-redux";
import { Product, cartActions } from "@slices/cartSlice";
import { store } from "@store";
import { Button, Modal, Input, Radio } from "antd";
import Image from "next/image";
import type { RadioChangeEvent } from "antd";
import Cart from "@components/elements/cart/Cart";

interface PageSEOData {
  name: string;
  pageSEO: {
    title: string;
    url: string;
    keywords: string[];
    description: string;
    image: string;
  };
}

interface NavigationProps {
  id: number;
  title: string;
  link: string;
}

const OrdersCart: React.FC = () => {
  const cartItems = useSelector(
    (state: ReturnType<typeof store.getState>) => state.cart.items
  );
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const pageSEOData: PageSEOData = {
    name: "Thương Thương",
    pageSEO: {
      title: "Đơn Hàng | Thương Thương",
      url: "https://www.critistudio.top/gioi-thieu",
      keywords: ["website", "home", "page"],
      description:
        "Thuong Thuong tổ chức đào tạo nghề cho đối tượng người khuyết tật và người yếu thế nhằm giảm gánh nặng cho gia đình và xã hội.",
      image: "https://www.critistudio.top/images/seo.jpg",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderdata, setOrderData] = useState({ id: 0, title: "" });
  const [values, setValues] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValues(e.target.value);
  };

  const handleOk = () => {
    dispatch(cartActions.decreaseItemQuantity(orderdata.id));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setOrderData({ ...orderdata, id: 0, title: "" });
    setIsModalOpen(false);
  };

  type DataItem = {
    id: number;
    product: string;
    price: number;
    quantity: number;
    selected: boolean;
  };
  const dataNavigation: NavigationProps[] = [
    {
      id: 1,
      title: `${t.navigator.HOME}`,
      link: "/",
    },
    {
      id: 2,
      title: `${t.navigator.MENU6}`,
      link: "/",
    },
  ];

  const confirmOrderHandler = () => {};
  const selectedItems = cartItems.filter((item) => item.selected);

  const totalOrderItems = selectedItems.reduce(
    (currNumber, item) => currNumber + item.quantity,
    0
  );

  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Modal
        centered
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="products-cart-modal"
        footer={[]}
      >
        <p className="products-cart-modal-title">{t.carts.NOTICAL1}</p>
        <p className="products-cart-modal-description">
          {t.carts.NOTICAL_TEXT1}{" "}
          <span className="products-cart-modal-description-hightline">
            {orderdata.title}
          </span>{" "}
          {t.carts.NOTICAL_TEXT2}
        </p>
        <div className="products-cart-modal-group">
          <div
            className="products-cart-modal-group-btn1"
            onClick={handleCancel}
          >
            {t.button.BUTTON13}
          </div>
          <div className="products-cart-modal-group-btn2" onClick={handleOk}>
            {t.button.BUTTON14}
          </div>
        </div>
      </Modal>
      <Layout>
        <div className="list-products">
          <div className="list-products-navigation">
            <NavigationTopBar data={dataNavigation} />
          </div>
          <h1 className="products-cart-title">{t.bills.HEADER}</h1>
          <div className="products-bill">
            <div className="products-bill-block">
              <div className="products-bill-block-b1">
                <div className="products-bill-block-b1-title">
                  <div className="products-bill-block-b1-title-text">
                    {t.bills.TITLE1}
                  </div>
                  <div className="products-bill-block-b1-title-btn">
                    <WarningOutlined /> {t.button.BUTTON12}
                  </div>
                </div>
                <div className="products-bill-block-b1-body">
                  {t.bills.DESCRIPTION1}
                </div>
              </div>
              <div className="products-bill-block-b1 products-bill-block-b2">
                <div className="products-bill-block-b1-title-text">
                  {t.bills.TITLE2}
                </div>
                <Radio.Group onChange={onChange} value={values}>
                  <div className="products-bill-block-b2-group">
                    <div>
                      <Radio
                        value={1}
                        className="products-bill-block-b2-group-item"
                      >
                        {t.bills.DESCRIPTION2_1}
                      </Radio>
                    </div>
                    <div>
                      <Radio
                        value={2}
                        className="products-bill-block-b2-group-item"
                      >
                        {t.bills.DESCRIPTION2_2}
                      </Radio>
                    </div>
                    <div>
                      <Radio
                        value={3}
                        className="products-bill-block-b2-group-item"
                      >
                        {t.bills.DESCRIPTION2_3}
                      </Radio>
                    </div>
                    <div>
                      <Radio
                        value={4}
                        className="products-bill-block-b2-group-item"
                      >
                        {t.bills.DESCRIPTION2_4}
                        {values === 4 ? (
                          <Input
                            style={{ marginLeft: 10 }}
                            className="products-bill-block-b2-group-item-input"
                          />
                        ) : null}
                      </Radio>
                    </div>
                  </div>
                </Radio.Group>
              </div>
              <div className="products-bill-block-b1 products-bill-block-b3">
                <div className="products-bill-block-b1-title-text">
                  {t.bills.TITLE3}
                </div>
                <TextArea
                  placeholder={t.bills.DESCRIPTION3}
                  showCount={false}
                  maxLength={300}
                  className="products-bill-block-b3-textarea"
                />
              </div>
              <Cart items={selectedItems} showCheckbox={false} />
            </div>
            <div className="products-cart-infor">
              <div className="products-cart-infor-header">
                <div className="products-cart-infor-title">{t.carts.TITLE}</div>
                <div className="products-cart-infor-block">
                  <div className="products-cart-infor-block-title">
                    {t.carts.LABEL1}{" "}
                    <span className="products-cart-infor-block-title-s">
                      ({totalOrderItems} {t.carts.LABEL2})
                    </span>
                  </div>
                  <div className="products-cart-infor-block-number">
                    {t.products.PRICE}
                  </div>
                </div>
                <div className="products-cart-infor-blockt">
                  <div className="products-cart-infor-blockt-title">
                    {t.carts.LABEL3}
                  </div>
                  <div className="products-cart-infor-blockt-number">
                    {t.products.PRICE}
                  </div>
                </div>
                <div className="products-cart-infor-sub">{t.carts.LABEL4}</div>
              </div>
              <div
                className="products-cart-infor-btn"
                onClick={confirmOrderHandler}
              >
                {t.carts.NOTICAL3}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OrdersCart;
