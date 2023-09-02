import { useState, useEffect } from "react";
import { Button } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
interface TitleProps {
  title: string;
  link: string;
  t: any;
}
const TitleProduct: React.FC<TitleProps> = ({ title, link, t }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h2 className="home__products-header-title">{title}</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="primary"
          size={"large"}
          className="home__products-header-btn"
        >
          <Link href={link} className="home__products-header-btn-text">
            {t.button.BUTTON3}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TitleProduct;
