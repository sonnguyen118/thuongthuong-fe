import React, { useState, useEffect, useRef, FormEvent } from "react";
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
import { Button, Modal, Input, Radio, Form, InputRef } from "antd";
import Image from "next/image";
import type { RadioChangeEvent } from "antd";
import Cart from "@components/elements/cart/Cart";
import classes from "./Order.module.css";
import { useRouter } from "next/router";
import { placeOrder } from "@api";
import { saveCartData } from "store/actions/cart-actions";
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
  const [nameInputRef, setNameInputRef] = useState("");
  const [phoneInputRef, setPhoneInputRef] = useState("");
  const [emailInputRef, setEmailInputRef] = useState("");
  const [addressInputRef, setAddressInputRef] = useState("");
  const descInputRef = useRef<HTMLTextAreaElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [orderSucceeded, setOrderSucceeded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cart = useSelector(
    (state: ReturnType<typeof store.getState>) => state.cart
  );

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

  useEffect(() => {
    saveCartData(cart);
  }, [cart]);

  useEffect(() => {
    const customerInfoString = localStorage.getItem("customerInfo");
    if (customerInfoString) {
      const customerInfo = JSON.parse(customerInfoString);
      if (customerInfo) {
        const { name, phone, email, address } = customerInfo;
        setNameInputRef(name);
        setPhoneInputRef(phone);
        setEmailInputRef(email);
        setAddressInputRef(address);
      }
    }
  }, []);

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

  const [values, setValues] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValues(e.target.value);
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

  const selectedItems = cartItems.filter((item) => item.selected);
  const totalOrderItems = selectedItems.reduce(
    (currNumber, item) => currNumber + item.quantity,
    0
  );

  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    const enteredName = nameInputRef;
    const enteredPhone = phoneInputRef;
    const enteredEmail = emailInputRef;
    const enteredAddress = addressInputRef;

    let time;
    switch (values) {
      case 1:
        time = t.bills.DESCRIPTION2_1;
        break;
      case 2:
        time = t.bills.DESCRIPTION2_2;
        break;
      case 3:
        time = t.bills.DESCRIPTION2_3;
        break;

      default:
        time = timeInputRef.current?.value;
        break;
    }

    const customerInfo = {
      name: enteredName,
      phone: enteredPhone,
      email: enteredEmail,
      address: enteredAddress,
    };

    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));

    const orderData = {
      ...customerInfo,
      time: time,
      description: descInputRef.current?.value,
      products: selectedItems.map((item) => {
        return { productId: item.id, quantity: item.quantity };
      }),
    };

    try {
      await placeOrder(orderData);
      dispatch(
        cartActions.removeItemFromCart(selectedItems.map((item) => item.id))
      );
      setOrderSucceeded(true);
    } catch (error) {
      setOrderSucceeded(false);
      console.log("Error when placing order ", error);
    } finally {
      setSubmitted(true);
    }
  }

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInputRef(event.target.value);
  };

  const phoneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneInputRef(event.target.value);
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInputRef(event.target.value);
  };

  const addressChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddressInputRef(event.target.value);
  };

  const confirmHandler = () => {
    if (orderSucceeded) {
      router.push("/");
    }
    setSubmitted(false);
  };

  return (
    <>
      (
      <Modal
        centered
        className="products-cart-modal"
        onCancel={confirmHandler}
        visible={submitted}
        footer={[]}
      >
        <p className="products-cart-modal-description">
          {orderSucceeded ? t.bills.TITLE9 : t.bills.TITLE10}
        </p>
        <div
          className="products-cart-modal-group-btn2"
          style={{ width: "30%", marginLeft: "35%" }}
          onClick={confirmHandler}
        >
          {orderSucceeded ? t.bills.TITLE11 : t.bills.TITLE12}
        </div>
      </Modal>
      )
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout>
        <form className={classes.form} onSubmit={submitHandler}>
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
                  </div>
                  <div className={classes.control}>
                    <input
                      type="text"
                      required
                      id="name"
                      placeholder={t.bills.TITLE5}
                      value={nameInputRef}
                      onChange={nameChangeHandler}
                    />
                  </div>
                  <div className={classes.control}>
                    <input
                      type="text"
                      required
                      id="phone"
                      placeholder={t.bills.TITLE6}
                      pattern="[0-9]{10,}"
                      value={phoneInputRef}
                      onChange={phoneChangeHandler}
                    />
                  </div>
                  <div className={classes.control}>
                    <input
                      type="email"
                      required
                      id="email"
                      placeholder={t.bills.TITLE7}
                      value={emailInputRef}
                      onChange={emailChangeHandler}
                    />
                  </div>
                  <div className={classes.control}>
                    <textarea
                      id="address"
                      required
                      rows={5}
                      placeholder={t.bills.TITLE8}
                      value={addressInputRef}
                      onChange={addressChangeHandler}
                    ></textarea>
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
                          <div className={classes.control}>
                            {" "}
                            {values === 4 ? (
                              <input
                                ref={timeInputRef}
                                style={{ marginLeft: 10 }}
                              />
                            ) : null}
                          </div>
                        </Radio>
                      </div>
                    </div>
                  </Radio.Group>
                </div>
                <div className="products-bill-block-b1 products-bill-block-b3">
                  <div className="products-bill-block-b1-title-text">
                    {t.bills.TITLE3}
                  </div>
                  <div className={classes.control}>
                    <textarea
                      id="description"
                      rows={5}
                      placeholder={t.bills.DESCRIPTION3}
                      ref={descInputRef}
                    ></textarea>
                  </div>
                </div>
                <Cart items={selectedItems} showCheckbox={false} />
              </div>
              <div className="products-cart-infor">
                <div className="products-cart-infor-header">
                  <div className="products-cart-infor-title">
                    {t.carts.TITLE}
                  </div>
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
                  <div className="products-cart-infor-sub">
                    {t.carts.LABEL4}
                  </div>
                </div>
                <button
                  type="submit"
                  className="products-cart-infor-btn"
                  style={{ border: "none" }}
                >
                  {t.carts.NOTICAL3}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default OrdersCart;
