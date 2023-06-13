import React, { useState, useEffect } from "react";
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

interface PiecesPuzzleProps {
  isShow: boolean;
  uderlineBlock2: boolean;
  iconBlock2: Array<string>;
  titleBlock2: string;
  listSliderBlock2: Array<string>;
  contentBlock2: any;
}

const PiecesPuzzle: React.FC<PiecesPuzzleProps> = ( props) => {
  const { isShow, iconBlock2, titleBlock2, listSliderBlock2, contentBlock2 } = props;
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
        title={null}
        urlImage={iconBlock2[0]}
        underlined={true}
      />
      <Row className="home__principles-puzzle">
        <Col className="home__principles-puzzle-image">
          <Image
            src={process.env.NEXT_PUBLIC_API_URL +"/" +listSliderBlock2[0]}
            alt="My Image"
            width={800}
            height={600}
            className="home__principles-puzzle-image-src"
          />
        </Col>
        <Col className="home__principles-puzzle-infor">
          <div>
            <Title level={2} className="home__principles-puzzle-infor-title">
              {titleBlock2}
            </Title>
            <Text className="home__principles-puzzle-infor-text">
              {contentBlock2.content1}
              <br></br>
              {contentBlock2.content2}
              <br></br>
              {contentBlock2.content3}
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
