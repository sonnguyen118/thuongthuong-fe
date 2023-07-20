import React, { useState, useEffect, useRef } from "react";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { NavigationTopBar } from "@components/elements/navigation";
import { ProductsSeems } from "@components/templates/products";
import { webInformationClient } from "@service";
// sử dụng redux
import { useSelector, useDispatch } from "react-redux";
import { Button, InputNumber, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetchCartData, saveCartData } from "store/actions/cart-actions";
import { Product, cartActions } from "@slices/cartSlice";
import { is } from "ramda";
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

interface CartItemsProps {
  id: number;
  price: number;
  quantity: number;
  title: string;
  imageUrl: string;
  selected: number;
}

interface NavigationProps {
  id: number;
  title: string;
  link: string;
}
interface pagesProps {
  dataMenu: any;
  dataFooter: any;
}
const OrdersCart: React.FC<pagesProps> = (props: pagesProps) => {
  const dispatch = useDispatch();
  const { dataMenu, dataFooter } = props;
  const cartItems = useSelector(
    (state: ReturnType<typeof store.getState>) => state.cart.items
  );

  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );

  const cart = useSelector(
    (state: ReturnType<typeof store.getState>) => state.cart
  );


  let isInitial = useRef(true);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    if (cart.changed) {
      saveCartData(cart);
    }
  }, [cart, dispatch]);

  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);

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
  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <div className="list-products">
          <div className="list-products-navigation">
            <NavigationTopBar data={dataNavigation} />
          </div>
          <h1 className="products-cart-title">GIỎ HÀNG</h1>
          <Cart items={cartItems} showCheckbox={true} />
          {/* <ProductsSeems title={t.products.HEADER3} /> */}
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const lang = context.query.lang
    if(lang === 'en') {
    const MenuEN : any = await  webInformationClient.handleGetWebInformation("5");
    const FooterEN:any = await webInformationClient.handleGetWebInformation("3");
    
    return {
      props: {
        dataMenu:  JSON.parse(MenuEN.value) || {},
        dataFooter: JSON.parse(FooterEN.value) || {},
      },
    };
  } else {
    const MenuVI : any = await  webInformationClient.handleGetWebInformation("4");
    const FooterVI:any = await webInformationClient.handleGetWebInformation("2");
    
    return {
      props: {
        dataMenu:  JSON.parse(MenuVI.value) || {},
        dataFooter: JSON.parse(FooterVI.value) || {},
      },
    };
  }

  } catch (e) {
    return { props: {} };
  }
}

export default OrdersCart;
