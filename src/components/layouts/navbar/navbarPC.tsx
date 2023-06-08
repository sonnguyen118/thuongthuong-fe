import React, { useState, useEffect } from "react"
import { Menu, Input, Button, Popover, List, Badge } from "antd"
// Import thư viện Ant Design
import Image from "next/image"
import Link from "next/link"
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons"
// sử dụng redux
import { useSelector } from "react-redux"
import { store } from "@store"
import viText from "@languages/vie.json"
import loadLanguageText from "@languages"
import classes from "./Nav.module.css"
interface Product {
  title: string
  description: string
  price: number
}

const NavbarPC: React.FC = () => {
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false)
  const [t, setText] = useState(viText)
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )

  useEffect(() => {
    loadLanguageText(lang, setText)
  }, [lang])

  const cartItems = useSelector(
    (state: ReturnType<typeof store.getState>) => state.cart.items
  )

  const totalQuantity = useSelector(
    (state: ReturnType<typeof store.getState>) => state.cart.totalQuantity
  )

  const { SubMenu } = Menu
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchText, setSearchText] = useState("")
  const numberOfCartItems = cartItems.reduce((currNumber, item) => {
    return currNumber + item.quantity
  }, 0)

  const btnClasses = `"cart" ${isBtnHighlighted ? classes.bump : ""}`

  useEffect(() => {
    setIsBtnHighlighted(true)

    const timer = setTimeout(() => {
      setIsBtnHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [totalQuantity])

  const handleSearch = (e: any) => {
    setSearchText(e.target.value)
  }

  const toggleSearchVisible = () => {
    setSearchVisible(!searchVisible)
  }

  const handleInputClick = (e: any) => {
    e.stopPropagation()
  }

  const cartContent = (
    <>
      {cartItems.length > 0 ? (
        <>
          <h5 className='cart-title'>{t.button.BUTTON8}</h5>
          <List
            size='small'
            dataSource={cartItems}
            className='cart-list'
            renderItem={item => (
              <List.Item className='cart-item'>
                <div className='cart-item-information'>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    className='cart-item-information-img'
                    width={60}
                    height={60}
                  />
                  <div className='cart-item-information-text'>
                    <h3 className='cart-item-information-text-title'>
                      {item.title}
                    </h3>
                    <p className='cart-item-information-text-quantity'>
                      {t.products.QUANTITY}: x{item.quantity}
                    </p>
                  </div>
                </div>
                <div className='cart-item-price'>
                  <p className='cart-item-price-text'>
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
          <div className='cart-btn'>
            <Link href='/gio-hang'>
              <Button
                type={"primary"}
                className='btn btn-primary cart-btn-item'
              >
                {t.button.BUTTON9}
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Image
            src='images/cart_empty.png'
            alt='Thương Thương giỏ hàng'
            className='cart-none-image'
            width={360}
            height={260}
          />
          <h3 className='cart-none-text'>{t.notical.TITLE1}</h3>
        </>
      )}
    </>
  )
  return (
    <>
      <Menu
        mode='horizontal'
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
        className='navbar__pc'
        items={[
          {
            key: "logo",
            label: (
              <h1 className='navbar__pc-logo'>
                <Link href='/'>
                  <Image
                    src='/icon/logo.png'
                    alt='ThuongThuong'
                    width={70}
                    height={60}
                    loading='lazy'
                    className='navbar__pc-logo-img'
                  />
                </Link>
              </h1>
            ),
            className: "navbar__pc-icon"
          },
          {
            key: "home",
            label: <Link href={"/"}>{t.menu.MENU1}</Link>,
            style: { marginLeft: "auto" },
            className: "navbar__pc-item"
          },
          {
            key: "introduce",
            label: <Link href={"/gioi-thieu"}>{t.menu.MENU2}</Link>,
            className: "navbar__pc-item"
          },
          {
            key: "news",
            label: <Link href={"/tin-tuc"}>{t.menu.MENU3}</Link>,
            className: "navbar__pc-item"
          },
          {
            key: "product",
            label: (
              <Link href={`/san-pham?language=${lang}`}>{t.menu.MENU4}</Link>
            ),
            className: "navbar__pc-item navbar__pc-item-dropdown",
            children: [
              { key: "1", label: <>{t.menu.SUBMENU1}</> },
              { key: "2", label: <>{t.menu.SUBMENU2}</> },
              { key: "3", label: <>{t.menu.SUBMENU3}</> },
              { key: "4", label: <>{t.menu.SUBMENU4}</> }
            ]
          },
          {
            key: "recruitment",
            label: <Link href={"/tuyen-dung"}>{t.menu.MENU5}</Link>,
            className: "navbar__pc-item"
          },
          {
            key: "contact",
            label: <Link href={"/lien-he"}>{t.menu.MENU6}</Link>,
            className: "navbar__pc-item"
          },
          {
            key: "cart",
            label: (
              <Popover
                placement='bottom'
                content={cartContent}
                className={btnClasses}
              >
                <Badge
                  count={numberOfCartItems}
                  overflowCount={99}
                  style={{ backgroundColor: "red" }}
                >
                  <Link href='/gio-hang'>
                    <Button
                      icon={
                        <ShoppingCartOutlined style={{ fontSize: "18px" }} />
                      }
                      style={{
                        border: "none",
                        textDecoration: "underline",
                        boxShadow: "none"
                      }}
                    />
                  </Link>
                </Badge>
              </Popover>
            ),
            className: "navbar__pc-icon"
          },
          {
            key: "search",
            label: (
              <div style={{ position: "relative" }}>
                <SearchOutlined style={{ fontSize: "18px" }} />
                {searchVisible && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      width: "300px",
                      zIndex: 1
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
            onClick: toggleSearchVisible
          }
        ]}
      />
    </>
  )
}

export default NavbarPC
