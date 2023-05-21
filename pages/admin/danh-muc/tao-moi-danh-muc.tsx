import React, { useState, useEffect } from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { Tabs, Button, Input, Select } from "antd";
import type { TabsProps } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useRouter } from "next/router";

interface NavigationProps {
  id: number;
  title: string;
  link: string;
}
const App: React.FC = () => {
  const router = useRouter();
  const [level2, setLevel2] = useState(false);
  const options = [
    {
      value: "1",
      label: "Not Identified",
    },
    {
      value: "2",
      label: "Closed",
    },
    {
      value: "3",
      label: "Communicated",
    },
    {
      value: "4",
      label: "Identified",
    },
    {
      value: "5",
      label: "Resolved",
    },
    {
      value: "6",
      label: "Cancelled",
    },
  ];
  useEffect(() => {
    // console.log(router.query.level);
    if (router.query.level) {
      switch (router.query.level) {
        case "1":
          setLevel2(false);
          break;
        case "2":
          setLevel2(true);
          break;
        default:
          setLevel2(false);
          break;
      }
    }
  }, [router.query.level]);
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
      title: level2 ? "Danh mục cấp 2" : "Danh mục cấp 1",
      link: level2
        ? "/admin/danh-muc/danh-muc-cap-2"
        : "/admin/danh-muc/danh-muc-cap-1",
    },
    {
      id: 3,
      title: level2 ? `Tạo mới danh mục cấp 2` : `Tạo mới danh mục cấp 1`,
      link: "/",
    },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tiếng Việt`,
      children: (
        <>
          <Input
            placeholder="Nhập và tên danh danh mục tiếng việt"
            size="large"
          />
        </>
      ),
    },
    {
      key: "2",
      label: `Tiếng Anh`,
      children: (
        <>
          <Input
            placeholder="Nhập vào tên danh danh mục tiếng anh"
            size="large"
          />
        </>
      ),
    },
    {
      key: "3",
      label: `Tiếng Pháp`,
      children: (
        <>
          <Input
            placeholder="Nhập vào tên danh danh mục tiếng pháp"
            size="large"
          />
        </>
      ),
    },
    {
      key: "4",
      label: `Tiếng Bồ Đào Nha`,
      children: (
        <>
          <Input
            placeholder="Nhập vào tên danh danh mục tiêng bồ đào nha"
            size="large"
          />
        </>
      ),
    },
  ];
  return (
    <Dashboard>
      <div className="admin__main-wrap">
        <NavigationAdmin
          header={level2 ? "Tạo mới danh mục cấp 2" : "Tạo mới danh mục cấp 1"}
          description={
            "Trang quản tạo - thêm mới danh mục cho sản phẩm của bạn"
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
            {level2 && (
              <>
                <div className="admin__main-wall"></div>
                <label className="admin__main-label">
                  <StarFilled style={{ marginRight: 5 }} />
                  Lựa chọn danh mục cha (Danh mục cấp 1)
                </label>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Gõ phím để tìm kiếm danh mục"
                  size="large"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={options}
                />
              </>
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
