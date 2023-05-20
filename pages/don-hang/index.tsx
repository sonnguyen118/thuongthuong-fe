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
import { removeItem } from "@slices/cartSlice";
import { store } from "@store";
import { Button, Modal, Input, Radio } from "antd";
import Image from "next/image";
import type { RadioChangeEvent } from "antd";

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

interface CartsProps {
  id: number;
  price: number;
  quantity: number;
  title: string;
  total: number;
  urlImage: string;
}

interface NavigationProps {
  id: number;
  title: string;
  link: string;
}

const OrdersCart: React.FC = () => {
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
  const [value, setValue] = useState(1);
  const [orderdata, setOrderData] = useState({ id: 0, title: "" });
  const [values, setValues] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValues(e.target.value);
  };
  const handleOk = () => {
    dispatch(removeItem(orderdata.id));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setOrderData({ ...orderdata, id: 0, title: "" });
    setIsModalOpen(false);
  };
  const cart = useSelector(
    (state: ReturnType<typeof store.getState>) => state.cart.items
  );

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
  const [data, setData] = useState<DataItem[]>([
    { id: 1, product: "Product 1", price: 10, quantity: 2, selected: false },
    { id: 2, product: "Product 2", price: 20, quantity: 1, selected: false },
    { id: 3, product: "Product 3", price: 5, quantity: 4, selected: false },
  ]);
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newData = data.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          selected: event.target.checked,
        };
      }
      return item;
    });
    setData(newData);
  };

  const handleOnChange = (newValue: number | null) => {
    if (newValue === null) {
      setValue(1);
    } else {
      setValue(newValue);
    }
  };
  const handleDeleteModal = (id: number, title: string) => {
    setOrderData({ ...orderdata, id: id, title: title });
    setIsModalOpen(true);
  };
  const renderTableData = () => {
    return cart.map((item: CartsProps) => {
      return (
        <tr key={item.id} className="products-cart-table-body-item">
          <td className="products-cart-table-body-item-1">
            <Image
              src={item.urlImage}
              alt={item.title}
              width={80}
              height={80}
              className="products-cart-table-body-item-1-img"
            />
            <span className="products-cart-table-body-item-1-title">
              {item.title}
            </span>
          </td>
          <td className="products-cart-table-body-item-2">
            {item.price === 0 ? t.products.PRICE : item.price}
          </td>
          <td className="products-cart-table-body-item-3">{item.quantity}</td>
          <td className="products-cart-table-body-item-4">
            {item.price === 0 ? t.products.PRICE : item.price * item.quantity}
          </td>
        </tr>
      );
    });
  };

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
              <div className="products-bill-block-b1 products-bill-block-b4">
                <div className="products-bill-block-b1-title-text">
                  {t.bills.TITLE4}
                </div>
                <table className="products-bill-block-b4-table">
                  <tbody className="products-cart-table-body">
                    {renderTableData()}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="products-cart-infor">
              <div className="products-cart-infor-header">
                <div className="products-cart-infor-title">{t.carts.TITLE}</div>
                <div className="products-cart-infor-block">
                  <div className="products-cart-infor-block-title">
                    {t.carts.LABEL1}{" "}
                    <span className="products-cart-infor-block-title-s">
                      ({cart.length} {t.carts.LABEL2})
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
                className={
                  cart.length > 0
                    ? "products-cart-infor-btn"
                    : "products-cart-infor-btn-dis"
                }
              >
                {t.carts.NOTICAL3}
              </div>
            </div>
          </div>

          <ProductsSeems title={t.products.HEADER3} />
        </div>
      </Layout>
    </>
  );
};

export default OrdersCart;
