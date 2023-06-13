import React, { useState, useEffect, useMemo } from "react";
import { Row, Col } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import Link from "next/link";

interface FooterProps {
  data: any;
}
const Footer: React.FC<FooterProps> = ( props) => {
  const { data} = props;
  console.log(data.subMenu1);
  const [menu1, setMenu1] = useState([]);
  const [menu2, setMenu2] = useState([]);
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  useMemo(()=> {
    if(data) {
      setMenu1(data.subMenu1);
      setMenu2(data.subMenu2);
    }
  },[data])
  return (
    <footer className="footer">
      <div className="footer__wrap">
        <Row>
          <Col lg={8} sm={24} xs={24}>
            <div className="footer__wrap-item">
              <h2 className="footer__wrap-item-title">{data.title1}</h2>
              {menu1.map((item:any, index:number)=> (
                <div key={item.key}>
                  <Link target="_blank " href={item.link}>
                    <h3>{item.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </Col>
          <Col lg={8} sm={24} xs={24}>
            <div className="footer__wrap-item">
              <h2 className="footer__wrap-item-title">{data.title2}</h2>
              {menu2.map((item:any, index:number)=> (
                <div key={item.key}>
                  <Link target="_blank " href={item.link}>
                    <h3>{item.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </Col>
          <Col lg={8} sm={24} xs={24}>
            <div className="footer__wrap-item">
              <h2 className="footer__wrap-item-title">{t.footer.TITLE4}</h2>
              <div className="footer__wrap-item-infor">
                <EnvironmentOutlined
                  style={{ marginRight: 8 }}
                  className="footer__wrap-item-infor-icon"
                />
                <h3 className="footer__wrap-item-infor-text">
                  {data.adress}
                </h3>
              </div>
              <div className="footer__wrap-item-infor">
                <PhoneOutlined
                  style={{ marginRight: 8 }}
                  className="footer__wrap-item-infor-icon"
                />
                <h3 className="footer__wrap-item-infor-text">
                  {data.hotLine}
                </h3>
              </div>
              <div className="footer__wrap-item-infor">
                <MailOutlined
                  style={{ marginRight: 8 }}
                  className="footer__wrap-item-infor-icon"
                />
                <h3 className="footer__wrap-item-infor-text">
                  {data.email}
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="footer__bottom">
        <div style={{textAlign : "center", width: "100%"}}>
          <span style={{ marginRight: 12 }}>©2023</span>
          <span style={{ marginRight: 12 }}>{t.footer.LISTMENU5_3}</span>
        </div>
      </Row>
    </footer>
  );
};

export default Footer;
