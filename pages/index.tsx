import React, { useState, useEffect } from "react";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { SlideBarsHome } from "@components/elements/Slider";
import {
  PrinciplesHome,
  PiecesPuzzleHome,
  CardTabs,
  ListProducts,
  BlockProducts,
  EventNews,
  ListPartner,
  ContactHome,
} from "@components/templates/home";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import { webInformationClient, handleProductsClient } from "@service";
import { setLoading } from "@slices/loadingState";
import { notification } from "antd";
import io from 'socket.io-client';
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
interface ListNewsProps {
  title: string;
  description: string;
  imageSrc: string;
}
interface pagesProps {
  dataPages: any;
  dataMenu: any;
  dataFooter: any;
  dataContact: any;
  dataProductHighlight: any;
  dataListProducts: any;
}
const Home: React.FC<pagesProps> = (props: pagesProps) => {
  const {dataPages, dataMenu, dataFooter, dataContact, dataProductHighlight, dataListProducts} = props;

  console.log(props, "asdasd")
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  const pageSEOData: PageSEOData = {
    name: "Thương Thương",
    pageSEO: {
      title: "Trang Chủ | Thương Thương",
      url: "https://www.critistudio.top",
      keywords: ["website", "home", "page"],
      description:
        "Thuong Thuong tổ chức đào tạo nghề cho đối tượng người khuyết tật và người yếu thế nhằm giảm gánh nặng cho gia đình và xã hội.",
      image: "https://www.critistudio.top/images/seo.jpg",
    },
  };
  useEffect (()=> {
  // Gọi hàm showNotification để hiển thị thông báo
  showNotification();
  },[])
  function showNotification() {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          var notification = new Notification('Yến lộ clip sex', {
            body: 'Bùi yến lộ clip sex',
            icon: "/byby.jpg" // Đường dẫn đến biểu tượng thông báo
          });
  
          notification.onclick = function () {
            // Xử lý khi người dùng nhấp vào thông báo
            console.log('Thông báo đã được nhấp');
          };
  
          setTimeout(function () {
            notification.close();
          }, 15000); // Đóng thông báo sau 15 giây
        }
      });
    }
  }
  useEffect(() => {
    const socket = io('http://localhost:5000'); // Thay đổi URL nếu cần thiết

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('orderCreated', (order) => {
      console.log('Received order:', order);
      // Xử lý thông tin đơn hàng ở đây
    });

    return () => {
      console.log('Connect Failure to WebSocket');
      socket.disconnect();
    };
  },[]);
  
  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} />
      <Layout dataMenu={dataMenu} dataFooter={dataFooter}>
        <SlideBarsHome isShow={dataPages.showBlock1} dataSlider={dataPages.dataSlider}/>
         <PrinciplesHome isShow={dataPages.showBlockS} dataBlock={dataPages.dataBlockS}/>
        <PiecesPuzzleHome isShow={dataPages.showBlock2} uderlineBlock={dataPages.uderlineBlock2} iconBlock={dataPages.iconBlock2} titleBlock={dataPages.titleBlock2} listSliderBlock={dataPages.listSliderBlock2} contentBlock={dataPages.contentBlock2}/>
        {/* <CardTabs /> */}
        <ListProducts isShow={dataPages.showBlock3} uderlineBlock={dataPages.uderlineBlock3} iconBlock={dataPages.iconBlock3} titleBlock={dataPages.titleBlock3} listSliderBlock={dataPages.listSliderBlock3}/>
        {dataProductHighlight && 
        <BlockProducts dataProductHighlight={dataProductHighlight} dataListProducts={dataListProducts}/>
        }
        <ListPartner isShow={dataPages.showBlock5} uderlineBlock={dataPages.uderlineBlock5} iconBlock={dataPages.iconBlock5} titleBlock={dataPages.titleBlock5} listSliderBlock={dataPages.listSliderBlock5}/>
        <ContactHome data={dataContact}/>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const DatapageVI :any = await webInformationClient.handleGetWebInformation("6");
    const MenuVI : any = await  webInformationClient.handleGetWebInformation("4");
    const FooterVI:any = await webInformationClient.handleGetWebInformation("2");
    const ContactVI :any = await webInformationClient.handleGetWebInformation("12");
    const ListProduct: any = await handleProductsClient.handleGetHighlight();

    try {
      const dataPages = JSON.parse(DatapageVI.value);
      if (dataPages.dataProduct && dataPages.dataProduct.length > 0) {
        const promises = dataPages.dataProduct.map(async (item: any) => {
          if (item.value) {
            const body = {
              categoryId: item.value,
              language: "VI",
              page: 1,
              size: 20,
              productName: "",
            };
            console.log(body, "body");
            const apiData: any = await handleProductsClient.getProductsByCategoryID(body);
            console.log(apiData, "apiData");
            return apiData.data;
          }
        });
    
        const resultArray = await Promise.all(promises);
        return {
          props: {
            dataPages: JSON.parse(DatapageVI.value) || {},
            dataMenu:  JSON.parse(MenuVI.value) || {},
            dataFooter: JSON.parse(FooterVI.value) || {},
            dataContact: JSON.parse(ContactVI.value) || {},
            dataProductHighlight: ListProduct.data?.products,
            dataListProducts: resultArray
          },
        };
      }
    } catch (e) {
      // Xử lý lỗi
    }
    
    if(ListProduct.meta?.status === 200) {
      return {
        props: {
          dataPages: JSON.parse(DatapageVI.value) || {},
          dataMenu:  JSON.parse(MenuVI.value) || {},
          dataFooter: JSON.parse(FooterVI.value) || {},
          dataContact: JSON.parse(ContactVI.value) || {},
          dataProductHighlight: ListProduct.data?.products,
          dataListProducts: null
        },
      };
    }
    return {
      props: {
        dataPages: JSON.parse(DatapageVI.value) || {},
        dataMenu:  JSON.parse(MenuVI.value) || {},
        dataFooter: JSON.parse(FooterVI.value) || {},
        dataContact: JSON.parse(ContactVI.value) || {},
        dataProductHighlight: null,
        dataListProducts: null
      },
    };

  } catch (e) {
    return { props: {} };
  }
}
export default Home;
