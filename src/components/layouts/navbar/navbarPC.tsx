import React, { useState, useEffect, useMemo } from "react";
import { Menu, Input, Button, Popover, List, Badge, Dropdown } from "antd";
// Import thư viện Ant Design
import Image from "next/image";
import Link from "next/link";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
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

const NavbarPC: React.FC<NavbarProps> = (props) => {
  const router = useRouter();
  const currentUrl = router.asPath;
  const { data } = props;
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);
  const [t, setText] = useState(viText);
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState<MenuProps["items"]>([]);
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      loadLanguageText(lang, setText);
    } else {
      loadLanguageText("vi", setText);
    }
    if (lang === "en") {
      handleCategoryClient
        .handleGetAllCategory("EN")
        .then((result: any) => {
          setCategory(result);
        })
        .catch((error) => {});
    } else {
      handleCategoryClient
        .handleGetAllCategory("VI")
        .then((result: any) => {
          setCategory(result);
        })
        .catch((error) => {});
    }
  }, []);

  useEffect(() => {
    if (category && category.length > 0) {
      const newArray: MenuProps["items"] = category.map((item: any) => ({
        key: item.id,
        label: (
          <Link
            href={`/san-pham/` + item.link}
            className="navbar__pc-item-dropdown-item"
            style={{ width: 500 }}
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
  // console.log(cartItems, "cartItems");

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

  const cartContent = (
    <>
      {cartItems.length > 0 ? (
        <>
          <h5 className="cart-title">{t.button.BUTTON8}</h5>
          <List
            size="small"
            dataSource={cartItems}
            className="cart-list"
            renderItem={(item) => (
              <List.Item className="cart-item">
                <div className="cart-item-information">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_FULL_URL}/${item.imageUrl}`}
                    alt={item.title}
                    className="cart-item-information-img"
                    width={60}
                    height={60}
                  />
                  <div className="cart-item-information-text">
                    <h3 className="cart-item-information-text-title">
                      {item.title}
                    </h3>
                    <p className="cart-item-information-text-quantity">
                      {t.products.QUANTITY}: x{item.quantity}
                    </p>
                  </div>
                </div>
                <div className="cart-item-price">
                  <p className="cart-item-price-text">
                    {item.price === 0 ? (
                      <>{t.products.PRICE}</>
                    ) : (
                      <>{item.price}</>
                    )}
                  </p>
                </div>
              </List.Item>
            )}
          />
          <div className="cart-btn">
            <Link href="/gio-hang">
              <Button
                type={"primary"}
                className="btn btn-primary cart-btn-item"
              >
                {t.button.BUTTON9}
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Image
            src="images/cart_empty.png"
            alt="Thương Thương giỏ hàng"
            className="cart-none-image"
            width={360}
            height={260}
          />
          <h3 className="cart-none-text">{t.notical.TITLE1}</h3>
        </>
      )}
    </>
  );
  return (
    <>
      <div className="navbar__pc">
        <h1 className="navbar__pc-logo">
          <Link href="/">
            <Image
              src="/icon/logo.png"
              alt="ThuongThuong"
              width={70}
              height={60}
              loading="lazy"
              className="navbar__pc-logo-img"
            />
          </Link>
        </h1>
        <div className="navbar__pc-menu">
          {data.map((item: any, index: number) => {
            if (item.isActivate) {
              if (item.link === "/san-pham") {
                return (
                  <Dropdown
                    menu={{ items }}
                    placement="bottom"
                    key={item.key}
                    // trigger={["click"]}
                    className="navbar__pc-menu-products"
                  >
                    <h2
                      className={
                        currentUrl.includes(item.link)
                          ? "navbar__pc-item-active"
                          : "navbar__pc-item"
                      }
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </h2>
                  </Dropdown>
                );
              } else if (item.link.includes("tin-tuc")) {
                return (
                  <h2
                    key={item.key}
                    className={
                      currentUrl.includes("tin-tuc")
                        ? "navbar__pc-item-active"
                        : "navbar__pc-item"
                    }
                  >
                    <Link href={item.link}>{item.title}</Link>
                  </h2>
                );
              } else {
                return (
                  <h2
                    key={item.key}
                    className={
                      item.link === currentUrl
                        ? "navbar__pc-item-active"
                        : "navbar__pc-item"
                    }
                  >
                    <Link href={item.link}>{item.title}</Link>
                  </h2>
                );
              }
            } else {
              return null;
            }
          })}
          <Menu
            mode="horizontal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            items={[
              {
                key: "cart",
                label: (
                  <Popover
                    placement="bottom"
                    content={cartContent}
                    className={btnClasses}
                  >
                    <Badge
                      count={numberOfCartItems}
                      overflowCount={99}
                      style={{ backgroundColor: "red" }}
                    >
                      <Link href="/gio-hang">
                        <Button
                          icon={
                            <ShoppingCartOutlined
                              style={{ fontSize: "18px", color: "#fff" }}
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
                  </Popover>
                ),
                className: "navbar__pc-icon",
              },
              {
                key: "search",
                label: (
                  <div style={{ position: "relative" }}>
                    <SearchOutlined
                      style={{ fontSize: "18px", color: "#fff" }}
                    />
                    {searchVisible && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          width: "300px",
                          zIndex: 1,
                        }}
                      >
                        <Input
                          placeholder={t.label.LABEL5}
                          prefix={<SearchOutlined />}
                          style={{ width: "100%" }}
                          onClick={handleInputClick}
                        />
                      </div>
                    )}
                  </div>
                ),
                className: "navbar__pc-icon",
                onClick: toggleSearchVisible,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default NavbarPC;
