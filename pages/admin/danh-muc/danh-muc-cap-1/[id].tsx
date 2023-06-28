import React, { useState, ReactNode, useEffect, useMemo } from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { Tabs, Button, Input, Select } from "antd";
import type { TabsProps } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import { setLoading } from "@slices/loadingState";
import { handleCategory } from "@service";
import { useDispatch } from "react-redux";
interface NavigationProps {
  id: number;
  title: string;
  link: string;
}
const App: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  useMemo(() => {
    const body = {
      language: "VI",
    };
    dispatch(setLoading(true));
    handleCategory
      .handleGetAllCategory()
      .then((result:any) => {
        // Xử lý kết quả trả về ở đây
        setData(result);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        // Xử lý lỗi ở đây
        console.log(error);
        dispatch(setLoading(false));
      });
  }, []);
  const [activeTab, setActiveTab] = useState("1");
  const onChange = (key: string) => {
    setActiveTab(key);
  };

  const navigationData: NavigationProps[] = [
    {
      id: 1,
      title: `Trang chủ`,
      link: "/admin",
    },
    {
      id: 2,
      title: `Danh mục`,
      link: "/admin/danh-muc",
    },
    {
      id: 3,
      title: "Danh mục cấp 1",
      link: "/admin/danh-muc/danh-muc-cap-1",
    },
    {
      id: 3,
      title: `Chỉnh sửa danh mục cấp 1`,
      link: "/",
    },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tiếng Việt`,
      children: (
        <>
        </>
      ),
    },
    {
      key: "2",
      label: `Tiếng Anh`,
      children: (
        <>
        </>
      ),
    }
  ];
  return (
    <Dashboard>
      <div className="admin__main-wrap">
        <NavigationAdmin
          header={"Chỉnh sửa danh mục cấp 1"}
          description={
            "Trang quản chỉnh sửa danh mục cấp 1 cho sản phẩm của bạn"
          }
          data={navigationData}
        />
        <div className="admin__main-content">
          <div className="admin__main-cards">
            <label className="admin__main-label">
              <StarFilled style={{ marginRight: 5 }} />
              Tên danh mục
            </label>
            <Tabs activeKey={activeTab} items={items} onChange={onChange} />
            {activeTab === "1" ? (
              <Input
                placeholder="Nhập vào tên danh danh mục tiếng việt"
                size="large"
              />
            ):(
              <Input
                placeholder="Nhập vào tên danh danh mục tiếng anh"
                size="large"
              />
            )}
            <div className="admin__main-wall"></div>
            <label className="admin__main-label">
              <StarFilled style={{ marginRight: 5 }} />
              Đường dẫn
            </label>

            <Input
              addonBefore={process.env.NEXT_PUBLIC_FULL_URL + "/"}
              placeholder=""
              size="large"
            />
          </div>
          <div className="admin__main-save">
            <Button type="default">Hủy</Button>
            <Button type="primary" style={{ marginLeft: 10 }}>
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default App;
