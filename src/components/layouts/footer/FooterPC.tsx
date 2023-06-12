import React, { useState, useEffect, ReactNode } from "react";
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

interface FooterProps {
  data: any;
}
const Footer = ( props: FooterProps) => {
  const { data} = props;
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  return (
    <footer className="footer">
      <div className="footer__wrap">
        <Row>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer__wrap-item">
              <h2 className="footer__wrap-item-title">{t.footer.TITLE1}</h2>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU1_1}</h3>
                </a>
              </div>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU1_2}</h3>
                </a>
              </div>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU1_3}</h3>
                </a>
              </div>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU1_4}</h3>
                </a>
              </div>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU1_5}</h3>
                </a>
              </div>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU1_6}</h3>
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer__wrap-item">
              <h2 className="footer__wrap-item-title">{t.footer.TITLE2}</h2>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU2_1}</h3>
                </a>
              </div>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU2_2}</h3>
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer__wrap-item">
              <h2 className="footer__wrap-item-title">{t.footer.TITLE3}</h2>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU3_1}</h3>
                </a>
              </div>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU3_2}</h3>
                </a>
              </div>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU3_3}</h3>
                </a>
              </div>
              <div>
                <a target="_blank " href="#">
                  <h3>{t.footer.LISTMENU3_4}</h3>
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer__wrap-item">
              <h2 className="footer__wrap-item-title">{t.footer.TITLE4}</h2>
              <div className="footer__wrap-item-infor">
                <EnvironmentOutlined
                  style={{ marginRight: 8 }}
                  className="footer__wrap-item-infor-icon"
                />
                <h3 className="footer__wrap-item-infor-text">
                  {t.footer.LISTMENU4_1}
                </h3>
              </div>
              <div className="footer__wrap-item-infor">
                <PhoneOutlined
                  style={{ marginRight: 8 }}
                  className="footer__wrap-item-infor-icon"
                />
                <h3 className="footer__wrap-item-infor-text">
                  {t.footer.LISTMENU4_2}
                </h3>
              </div>
              <div className="footer__wrap-item-infor">
                <MailOutlined
                  style={{ marginRight: 8 }}
                  className="footer__wrap-item-infor-icon"
                />
                <h3 className="footer__wrap-item-infor-text">
                  {t.footer.LISTMENU4_3}
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="footer__bottom">
        <Col lg={6} sm={24} />
        <Col lg={18} sm={24}>
          <span
            style={{
              lineHeight: "16px",
              paddingRight: 12,
              marginRight: 11,
              borderRight: "1px solid rgba(255, 255, 255, 0.55)",
            }}
          >
            <a
              href="https://docs.alipay.com/policies/privacy/antfin"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t.footer.LISTMENU5_1}
            </a>
          </span>
          <span style={{ marginRight: 24 }}>
            <a
              href="https://render.alipay.com/p/f/fd-izto3cem/index.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t.footer.LISTMENU5_2}
            </a>
          </span>
          <span style={{ marginRight: 12 }}>©2023</span>
          <span style={{ marginRight: 12 }}>{t.footer.LISTMENU5_3}</span>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
