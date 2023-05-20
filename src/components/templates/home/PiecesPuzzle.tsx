import { useState, useEffect } from "react";
import { DetailedHTMLProps, IframeHTMLAttributes } from "react";
import { Button, Row, Col, Typography } from "antd";
import Image from "next/image";
import { TitleBlock } from "@components/elements/block";
// language
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
const { Title, Text } = Typography;
interface IFrameProps
  extends DetailedHTMLProps<
    IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {}
const PiecesPuzzle = () => {
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  return (
    <div className="home__principles">
      <TitleBlock
        title={t.home.HEADER1}
        urlImage={"/images/home/iconnho.png"}
        underlined={true}
      />
      <Row className="home__principles-puzzle">
        <Col className="home__principles-puzzle-image">
          <Image
            src="/images/home/anhgioithieu-768x576.jpg"
            alt="My Image"
            width={800}
            height={600}
            className="home__principles-puzzle-image-src"
          />
        </Col>
        <Col className="home__principles-puzzle-infor">
          <div>
            <Title level={2} className="home__principles-puzzle-infor-title">
              {t.home.TITLE1}
            </Title>
            <Text className="home__principles-puzzle-infor-text">
              {t.home.DESCRIPTION1}
              <br></br>
              {t.home.DESCRIPTION1_SUB}
            </Text>
          </div>
          <Button type="primary" className="home__principles-puzzle-infor-btn">
            {t.button.BUTTON1}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PiecesPuzzle;
