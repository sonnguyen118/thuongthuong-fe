import React, { useState, useEffect } from "react";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { NavigationTopBar } from "@components/elements/navigation";
import { ProductsSeems } from "@components/templates/products";
import { DeleteOutlined } from "@ant-design/icons";
// sử dụng redux
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@slices/cartSlice";
import { Button, InputNumber, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const pageSEOData: PageSEOData = {
    name: "Thương Thương",
    pageSEO: {
      title: "Tranh cuốn giấy | Thương Thương",
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
      title: `${t.navigator.MENU5}`,
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

  const handleOrders = () => {
    router.push("/don-hang");
  };

  const renderTableData = () => {
    return cart.map((item: CartsProps) => {
      return (
        <tr key={item.id} className="products-cart-table-body-item">
          <td className="products-cart-table-body-item-0">
            <input
              type="checkbox"
              // checked={item.selected || false}
              onChange={(event) => handleCheckboxChange(event, item.id)}
              className="products-cart-table-input"
            />
          </td>
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
          <td className="products-cart-table-body-item-3">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => handleOnChange(value - 1)}
                className="products-cart-table-body-item-3-btn"
              >
                <span className="products-cart-table-body-item-3-btn-icon">
                  -
                </span>
              </Button>
              <InputNumber
                defaultValue={1}
                min={1}
                max={10}
                value={value}
                onChange={handleOnChange}
                style={{ margin: "0 0.2em" }}
                className="products-cart-table-body-item-3-input"
              />
              <Button
                onClick={() => handleOnChange(value + 1)}
                className="products-cart-table-body-item-3-btn"
              >
                <span className="products-cart-table-body-item-3-btn-icon">
                  +
                </span>
              </Button>
            </div>
          </td>
          <td className="products-cart-table-body-item-4">
            {item.price === 0 ? t.products.PRICE : item.price * item.quantity}
          </td>
          <td className="products-cart-table-body-item-5">
            <DeleteOutlined
              onClick={() => handleDeleteModal(item.id, item.title)}
            />
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
          <h1 className="products-cart-title">GIỎ HÀNG</h1>
          <div className="products-cart">
            {cart.length > 0 ? (
              <table className="products-cart-table">
                <thead>
                  <tr className="products-cart-table-header">
                    <th className="products-cart-table-header-0">
                      <input
                        type="checkbox"
                        className="products-cart-table-input"
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </th>
                    <th className="products-cart-table-header-1">
                      {t.carts.MENU1}
                    </th>
                    <th className="products-cart-table-header-2">
                      {t.carts.MENU2}
                    </th>
                    <th className="products-cart-table-header-3">
                      {t.carts.MENU3}
                    </th>
                    <th className="products-cart-table-header-4">
                      {t.carts.MENU4}
                    </th>
                    <th className="products-cart-table-header-5"></th>
                  </tr>
                </thead>
                <tbody className="products-cart-table-body">
                  {renderTableData()}
                </tbody>
              </table>
            ) : (
              <div className="products-cart-embty">
                <Image
                  src="/images/cart_empty.png"
                  width={300}
                  height={220}
                  alt="Giỏ hàng trống"
                  className="products-cart-embty-img"
                />
                <h3 className="products-cart-embty-text">
                  {t.carts.NOTICAL_TEXT3}
                </h3>
              </div>
            )}

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
                onClick={handleOrders}
              >
                {t.carts.NOTICAL2}
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
