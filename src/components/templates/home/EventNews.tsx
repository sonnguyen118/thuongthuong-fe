import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { CardNewsHome } from "@components/elements/card";
import { ListNewsHome } from "@components/elements/list";
import { TitleBlock } from "@components/elements/block";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";

type ContainerProps = {
  cardTitle: string;
  cardDescription: string;
  cardImageSrc: string;
  listItems: {
    title: string;
    description: string;
    imageSrc: string;
  }[];
};

const EventNews: React.FC<ContainerProps> = ({
  cardTitle,
  cardDescription,
  cardImageSrc,
  listItems,
}) => {
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  return (
    <div className="home__event">
      <TitleBlock
        title={t.home.HEADER4}
        urlImage={"/images/home/iconnho06.png"}
        underlined={false}
      />
      <Row className="home__event-wrap">
        <Col span={12}>
          <CardNewsHome
            title={cardTitle}
            description={cardDescription}
            imageSrc={cardImageSrc}
          />
        </Col>
        <Col span={12}>
          <ListNewsHome items={listItems} />
        </Col>
      </Row>
    </div>
  );
};

export default EventNews;
