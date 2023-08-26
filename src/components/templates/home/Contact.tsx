import React, { useState, useEffect } from "react";
import { Row } from "antd";
import { FormContactHome } from "@components/elements/form";
import { TitleBlock } from "@components/elements/block";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
interface ContactProps {
  data: any;
  t: any;
}

const Contact: React.FC<ContactProps> = (props) => {
  const { data, t } = props;

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="home__contact">
      <TitleBlock
        title={data.titleBlock}
        urlImage={data.iconBlock ? data.iconBlock[0] : ""}
        underlined={data.underlineBlock}
      />
      <div
        className="home__contact-map"
        dangerouslySetInnerHTML={{ __html: data.map }}
      />
      <Row className="home__contact-wrap">
        <div className="home__contact-wrap-left">
          <p className="home__contact-wrap-left-title">
            {data.phone}
            <br></br>
            {data.hotline}
            <br></br>
            {data.email}
            <br></br>
            {data.adress1}
            <br></br>
            {data.adress2}
          </p>
          <p className="home__contact-wrap-left-text">
            {data.content?.content1}
            <br></br>
            {data.content?.content2}
            <br></br>
            {data.content?.content3}
          </p>
        </div>
        <div className="home__contact-wrap-right">
          <FormContactHome t={t} />
        </div>
      </Row>
    </div>
  );
};

export default Contact;
