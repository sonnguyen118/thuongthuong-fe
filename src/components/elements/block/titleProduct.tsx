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
}
const TitleProduct: React.FC<TitleProps> = ({ title, link }) => {
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
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
