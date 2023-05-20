import React, { useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import {
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SearchOutlined,
  BellOutlined,
  LogoutOutlined,
  DownOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  ShopOutlined,
  UserOutlined,
  FileProtectOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Menu,
  Input,
  Button,
  Popover,
  List,
  Badge,
  Dropdown,
  message,
  Space,
  Spin,
} from "antd";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@slices/loadingState";

type MenuItemRT = Required<MenuProps>["items"][number];
type NoticeProps = {
  link: string;
  title: string;
  time: string;
};
type MenuItem = {
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  label: React.ReactNode;
  type?: "group";
  to?: string;
};

type LayoutProps = {
  children: ReactNode;
};

const notice: NoticeProps[] = [
  { link: "/admin", title: "Thông báo 1", time: "8:00 thứ 6 22/05/2023" },
  { link: "/admin", title: "Thông báo 1", time: "8:00 thứ 6 22/05/2023" },
  { link: "/admin", title: "Thông báo 1", time: "8:00 thứ 6 22/05/2023" },
  { link: "/admin", title: "Thông báo 1", time: "8:00 thứ 6 22/05/2023" },
  { link: "/admin", title: "Thông báo 1", time: "8:00 thứ 6 22/05/2023" },
];
interface RootState {
  loading: {
    loading: boolean;
  };
}
const Dashboard = ({ children }: LayoutProps) => {
  const router = useRouter();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();
  const toggleLoading = () => {
    dispatch(setLoading(!loading));
  };
  const [collapsed, setCollapsed] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const toggleSearchVisible = () => {
    setSearchVisible(!searchVisible);
  };
  const handleInputClick = (e: any) => {
    e.stopPropagation();
  };
  // Function to generate menu items
  function getItem(
    label: string,
    key: string,
    icon?: ReactNode,
    children?: MenuItem[],
    to?: string
  ) {
    return {
      key,
      label,
      icon,
      children,
      to,
    };
  }
  // Render menu item function
  function renderMenuItem(item: MenuItem) {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
          {item.children.map(renderMenuItem)}
        </Menu.SubMenu>
      );
    } else if (item.to) {
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link href={item.to}>{item.label}</Link>
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      );
    }
  }
  const items: MenuItem[] = [
    getItem("Dashbroad", "1", <PieChartOutlined />, undefined, "/admin"),
    getItem("Đơn Hàng", "sub1", <ShoppingCartOutlined />, [
      getItem(
        "Đơn Hàng chưa xử lý",
        "2",
        undefined,
        undefined,
        "/admin/don-hang/don-hang-chua-xu-ly"
      ),
      getItem(
        "Đơn Hàng đã xử lý",
        "3",
        undefined,
        undefined,
        "/admin/don-hang/don-hang-da-xu-ly"
      ),
      getItem("Tất cả Đơn Hàng", "4", undefined, undefined, "/admin/don-hang"),
    ]),
    getItem("Liên Hệ", "sub2", <MailOutlined />, [
      getItem("Liên Hệ chưa xử lý", "5"),
      getItem("Liên Hệ đã xử lý", "6"),
      getItem("Tất cả Liên Hệ", "7"),
    ]),
    getItem("Danh Mục Sản Phẩm", "sub3", <ShopOutlined />, [
      getItem("Danh mục cấp 1", "8"),
      getItem("Danh mục cấp 2", "9"),
      getItem("Tất cả Danh Mục", "10"),
      getItem("Tạo mới Danh Mục", "11"),
    ]),
    getItem("Sản Phẩm", "sub4", <InboxOutlined />, [
      getItem("Sản Phẩm bán chạy", "12"),
      getItem("Sản Phẩm đã xóa", "13"),
      getItem("Toàn bộ Sản Phẩm", "14"),
      getItem("Tạo mới Sản Phẩm", "15"),
    ]),
    getItem("Layout", "sub5", <DesktopOutlined />, [
      getItem("Menu", "16"),
      getItem("Footer", "17"),
    ]),
    getItem("Bài viết hệ thống", "sub6", <FileProtectOutlined />, [
      getItem("Trang chủ", "18"),
      getItem("Giới Thiệu", "19"),
      getItem("Tuyển Dụng", "20"),
      getItem("Liên Hệ", "21"),
    ]),
    getItem("Bài viết tin tức", "sub7", <FileTextOutlined />, [
      getItem("Toàn bộ bài viết", "22"),
      getItem("Bài việt đã ẩn", "23"),
      getItem("Thêm bài viết", "24"),
    ]),
    getItem("Người Dùng", "sub8", <UserOutlined />, [
      getItem("Thêm người dùng", "25"),
      getItem("Danh sách người dùng", "26"),
    ]),
  ];
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  useEffect(() => {
    if (!cookies.accessToken) {
      router.push("/login");
    }
  }, [cookies.accessToken, router]);
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    handleLogout();
  };

  const handleLogout = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    router.push("/login");
  };

  const cartContent = (
    <>
      {notice.length > 0 ? (
        <>
          <div className="cart-title">THÔNG BÁO</div>
          <div className="cart-title">
            Bạn có {notice.length} thông báo chưa đọc
          </div>
          <List
            size="small"
            dataSource={notice}
            className="cart-list"
            renderItem={(item) => (
              <List.Item className="cart-item">
                <div className="cart-item-information">
                  <div className="cart-item-information-text">
                    <h3 className="cart-item-information-text-title">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </>
      ) : (
        <>
          <h3 className="cart-none-text"></h3>
        </>
      )}
    </>
  );

  const itemsLogout: MenuProps["items"] = [
    {
      label: "Đăng xuất",
      key: "1",
      icon: <LogoutOutlined />,
    },
  ];

  const menuProps: MenuProps = {
    items: itemsLogout,
    onClick: handleMenuClick,
  };
  return (
    <div className="admin__layout-dasbroah">
      <div
        className={
          collapsed
            ? "admin__layout-dasbroah-slidebar admin__layout-dasbroah-slidebar-off"
            : "admin__layout-dasbroah-slidebar admin__layout-dasbroah-slidebar-on"
        }
      >
        <Link
          href={"/admin"}
          className="admin__layout-dasbroah-slidebar-header"
        >
          <Image
            src="/icon/logo.png"
            alt="logo"
            width={40}
            height={36}
            className="admin__layout-dasbroah-slidebar-header-logo"
          />
          {!collapsed && (
            <span className="admin__layout-dasbroah-slidebar-header-title">
              ThuongThuong Admin
            </span>
          )}
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          inlineCollapsed={collapsed}
          className="admin__layout-dasbroah-slidebar-menu"
        >
          {items.map(renderMenuItem)}
        </Menu>

        <div className="admin__layout-dasbroah-slidebar-logout">
          <LogoutOutlined className="admin__layout-dasbroah-slidebar-logout-icon" />
          {!collapsed && (
            <span
              className="admin__layout-dasbroah-slidebar-logout-text"
              onClick={handleLogout}
            >
              Đăng xuất
            </span>
          )}
        </div>
      </div>
      <div
        className={
          collapsed
            ? "admin__layout-dasbroah-wrap admin__layout-dasbroah-wrap-off"
            : "admin__layout-dasbroah-wrap admin__layout-dasbroah-wrap-on"
        }
      >
        <div
          className={
            collapsed
              ? "admin__layout-dasbroah-navbar admin__layout-dasbroah-navbar-off"
              : "admin__layout-dasbroah-navbar admin__layout-dasbroah-navbar-on"
          }
        >
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
            className="admin__layout-dasbroah-navbar-btn"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div className="admin__layout-dasbroah-navbar-information">
            <Menu
              mode="horizontal"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
              className="admin__layout-dasbroah-navbar-information-notical"
              items={[
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
                            zIndex: 1,
                          }}
                        >
                          <Input
                            placeholder={"Tìm kiếm"}
                            prefix={<SearchOutlined />}
                            style={{ width: "100%" }}
                            onClick={handleInputClick}
                          />
                        </div>
                      )}
                    </div>
                  ),
                  className:
                    "admin__layout-dasbroah-navbar-information-notical-icon",
                  onClick: toggleSearchVisible,
                },
                {
                  key: "notice",
                  label: (
                    <Popover
                      placement="bottom"
                      content={cartContent}
                      className=""
                    >
                      <Badge
                        count={notice.length}
                        overflowCount={99}
                        style={{ backgroundColor: "red" }}
                      >
                        <Button
                          icon={<BellOutlined style={{ fontSize: "18px" }} />}
                          style={{
                            border: "none",
                            textDecoration: "underline",
                            boxShadow: "none",
                          }}
                        />
                      </Badge>
                    </Popover>
                  ),
                  className: "",
                },
              ]}
            />
            <div className="admin__layout-dasbroah-navbar-information-user">
              <div
                style={{
                  backgroundImage: 'url("/images/admin/usertest.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50%",
                  border: "1px solid green",
                }}
                className="admin__layout-dasbroah-navbar-information-avatar"
              ></div>
              <Dropdown
                menu={menuProps}
                className="admin__layout-dasbroah-navbar-information-avatar-logout"
              >
                <Button>
                  <Space>
                    Xin Chào <strong>AdminStaylor</strong>
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="admin__layout-main">
          {children}
          {loading && (
            <div className="admin__layout-main-loading">
              <Spin size="large" className="admin__layout-main-loading-icon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
