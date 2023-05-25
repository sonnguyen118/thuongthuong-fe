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
      title: "Danh mục cấp 2",
      link: "/admin/danh-muc/danh-muc-cap-2",
    },
    {
      id: 3,
      title: "Chỉnh sửa danh mục cấp 2",
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
          header={"Chỉnh sửa danh mục cấp 2"}
          description={"Trang chỉnh sửa danh mục cấp 2 cho sản phẩm của bạn"}
          data={navigationData}
        />
        <div className="admin__main-content">
          <div className="admin__main-cards">
            <label className="admin__main-label">
              <StarFilled style={{ marginRight: 5 }} />
              Tên danh mục
            </label>
            <Tabs activeKey={activeTab} items={items} onChange={onChange} />

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
