import React, { useState, useEffect, useMemo } from "react";
import { Menu, Input, Button, Popover, List, Badge, Dropdown } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
// sử dụng redux
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import classes from "./Nav.module.css";
import { useRouter } from "next/router";
import type { MenuProps } from "antd";
import { handleCategoryClient } from "@service";

interface NavbarProps {
  data: any;
}

const NavbarMobile: React.FC<NavbarProps> = (props) => {
  const router = useRouter();
  const currentUrl = router.asPath;
  const { data } = props;
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);
  const [t, setText] = useState(viText);
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState<MenuProps["items"]>([]);
  useEffect(() => {
    handleCategoryClient
      .handleGetAllCategory("VI")
      .then((result: any) => {
        setCategory(result);
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    if (category && category.length > 0) {
      const newArray: MenuProps["items"] = category.map((item: any) => ({
        key: item.id,
        label: (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={item.link}
            className="navbar__pc-item-dropdown-item"
          >
            {item.name}
          </Link>
        ),
      }));
      setItems(newArray);
    }
  }, [category]);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );

  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);

  const cartItems = useSelector(
    (state: ReturnType<typeof store.getState>) => state.cart.items
  );

  const totalQuantity = useSelector(
    (state: ReturnType<typeof store.getState>) => state.cart.totalQuantity
  );

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [btnClasses, setBtnCalss] = useState("");
  const [numberOfCartItems, setNumberOfCartItems] = useState<
    number | undefined
  >();

  // const numberOfCartItems = cartItems.reduce((currNumber, item) => {
  //   return currNumber + item.quantity;
  // }, 0);

  useEffect(() => {
    if (cartItems) {
      setBtnCalss(`"cart" ${isBtnHighlighted ? classes.bump : ""}`);
      const number = cartItems.reduce((currNumber, item) => {
        return currNumber + item.quantity;
      }, 0);
      setNumberOfCartItems(number);
    }
  }, [cartItems]);

  useEffect(() => {
    if (totalQuantity) {
      setIsBtnHighlighted(true);

      const timer = setTimeout(() => {
        setIsBtnHighlighted(false);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [totalQuantity]);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const toggleSearchVisible = () => {
    setSearchVisible(!searchVisible);
  };

  const handleInputClick = (e: any) => {
    e.stopPropagation();
  };

  const menu = (
    <Menu
      className="navbar__mobile-body-icon-dropdown"
      style={{ width: "100%" }}
    >
      {data.map((item: any, i: number) => (
        <>
          <Menu.Item
            key={item.key}
            className="navbar__mobile-body-icon-dropdown-item"
          >
            <Link href={item.link}>{item.title}</Link>
          </Menu.Item>
        </>
      ))}
    </Menu>
  );

  return (
    <>
      <div className="navbar__mobile">
        <div className="navbar__mobile-header">
          <div className="navbar__mobile-header-icon">
            <SearchOutlined className="navbar__mobile-header-icon-item" />
            <Badge
              count={numberOfCartItems}
              overflowCount={99}
              style={{ backgroundColor: "red" }}
            >
              <Link href="/gio-hang">
                <Button
                  icon={
                    <ShoppingCartOutlined
                      className="navbar__mobile-header-icon-item"
                    />
                  }
                  style={{
                    border: "none",
                    textDecoration: "underline",
                    boxShadow: "none",
                  }}
                />
              </Link>
            </Badge>
          </div>
          <div className="navbar__mobile-header-title">
            {/* <span className="navbar__mobile-header-title-item">
              <Link href={"/"}>Tin Tức</Link>
            </span> */}
            <span className="navbar__mobile-header-title-item">
              <Link href={"/san-pham/danh-muc"}>
                Danh Mục Sản Phẩm
                <CaretRightOutlined className="navbar__mobile-header-title-item-icon" />
              </Link>
            </span>
          </div>
        </div>

        <div className="navbar__mobile-body">
          <h1 className="navbar__mobile-body-logo">
            <Link href="/">
              <Image
                src="/icon/logo.png"
                alt="ThuongThuong"
                width={55}
                height={45}
                loading="lazy"
                className="navbar__mobile-body-logo-img"
              />
            </Link>
          </h1>
          <Dropdown overlay={menu} trigger={["click"]}>
            <UnorderedListOutlined className="navbar__mobile-body-icon" />
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
