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
  uderlineBlock: boolean;
  iconBlock: Array<string>;
  titleBlock: string;
  listSliderBlock: Array<string>;
  contentBlock: any;
  t: any
}

const PiecesPuzzle: React.FC<PiecesPuzzleProps> = ( props) => {
  const { isShow,uderlineBlock, iconBlock, titleBlock, listSliderBlock, contentBlock, t } = props;

  return (
    <div className="home__principles">
      <TitleBlock
        title={null}
        urlImage={iconBlock[0]}
        underlined={uderlineBlock}
      />
      <Row className="home__principles-puzzle">
        <Col className="home__principles-puzzle-image">
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + '/' + listSliderBlock[0]}
            alt="My Image"
            layout="fill"
            objectFit="cover"
            className="home__principles-puzzle-image-src"
          />
        </Col>
        <Col className="home__principles-puzzle-infor">
          <div>
            <Title level={2} className="home__principles-puzzle-infor-title">
              {titleBlock}
            </Title>
            <Text className="home__principles-puzzle-infor-text">
              {contentBlock.content1}
              <br></br>
              {contentBlock.content2}
              <br></br>
              {contentBlock.content3}
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
