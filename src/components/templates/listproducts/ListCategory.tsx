import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";

const ListCategory = () => {
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  return (
    <div className="list-products-left">
      <div className="list-products-left-title">{t.list_products.TITLE}</div>
      <div className="list-products-left-wall"></div>
      <div className="list-products-left-item">
        <div className="list-products-left-item-ul">
          {t.list_products.MENU1}
        </div>
        <div className="list-products-left-item-li">{t.list_products.DES1}</div>
        <div className="list-products-left-item-li">{t.list_products.DES2}</div>
        <div className="list-products-left-item-li">{t.list_products.DES3}</div>
        <div className="list-products-left-item-li">{t.list_products.DES4}</div>
        <div className="list-products-left-item-li">{t.list_products.DES5}</div>
      </div>
      <div className="list-products-left-item">
        <div className="list-products-left-item-ul">
          {t.list_products.MENU1}
        </div>
        <div className="list-products-left-item-li">{t.list_products.DES1}</div>
        <div className="list-products-left-item-li">{t.list_products.DES2}</div>
        <div className="list-products-left-item-li">{t.list_products.DES3}</div>
        <div className="list-products-left-item-li">{t.list_products.DES4}</div>
        <div className="list-products-left-item-li">{t.list_products.DES5}</div>
      </div>
      <div className="list-products-left-item">
        <div className="list-products-left-item-ul">
          {t.list_products.MENU1}
        </div>
        <div className="list-products-left-item-li">{t.list_products.DES1}</div>
        <div className="list-products-left-item-li">{t.list_products.DES2}</div>
        <div className="list-products-left-item-li">{t.list_products.DES3}</div>
        <div className="list-products-left-item-li">{t.list_products.DES4}</div>
        <div className="list-products-left-item-li">{t.list_products.DES5}</div>
      </div>
    </div>
  );
};
export default ListCategory;
