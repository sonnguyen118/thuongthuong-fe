import React, { useState, ReactNode, useEffect, useMemo } from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { Tabs, Button, Input, Select, notification } from "antd";
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
  const [link, setLink] = useState("");
  const [name, setName] = useState<{ [key: string]: string | undefined }>({
    VI: undefined,
    EN: undefined
  });
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      const body = {
        id: Number(id)
      };
      dispatch(setLoading(true));
      handleCategory
        .handleGetOne(body)
        .then((result: any) => {
          // Xử lý kết quả trả về ở đây
          setData(result);
          setName(result.name);
          setLink(result.link);
          dispatch(setLoading(false));
        })
        .catch((error) => {
          // Xử lý lỗi ở đây
          console.log(error);
          dispatch(setLoading(false));
        });
    }
  }, [id]);

  const [activeTab, setActiveTab] = useState("1");
  const onChange = (key: string) => {
    setActiveTab(key);
  };
  type LanguageKey = "VI" | "EN" | "FR" | "PO";
  const handleInputChange =
    (languageKey: LanguageKey) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setName((prevName) => ({
          ...prevName,
          [languageKey]: event.target.value
        }));
      };
  const navigationData: NavigationProps[] = [
    {
      id: 1,
      title: `Trang chủ`,
      link: "/admin"
    },
    {
      id: 2,
      title: `Danh mục`,
      link: "/admin/danh-muc"
    },
    {
      id: 3,
      title: "Danh mục cấp 1",
      link: "/admin/danh-muc/danh-muc-cap-1"
    },
    {
      id: 3,
      title: `Chỉnh sửa danh mục cấp 1`,
      link: "/"
    }
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tiếng Việt`,
      children: (
        <>
        </>
      )
    },
    {
      key: "2",
      label: `Tiếng Anh`,
      children: (
        <>
        </>
      )
    }
  ];
  // hủy và lưu dữ liệu
  const handleSubmit = () => {
    const body = {
      id: Number(id),
      name: name,
      link: link,
      parent: "",
    };
    dispatch(setLoading(true));
    handleCategory
      .handleUpdate(body)
      .then((result: any) => {
        notification.success({
          message: "Cập nhật thành công",
          description: "Bạn đã tiến hành cập nhật dữ liệu thành công",
          duration: 1.5,
          onClose: () => {
            dispatch(setLoading(false));
            router.reload();
          },
        });
      })
      .catch((error) => {
        // Xử lý lỗi ở đây
        console.log(error);
        notification.error({
          message: "Cập nhật dữ liệu thất bại",
          description: "Đã có lỗi xảy ra trong quá trình cập nhật dữ liệu",
          duration: 1.5,
          onClose: () => {
            dispatch(setLoading(false));
          },
        });
      });
  };
  const handleReject = () => {
    router.push("/admin/danh-muc/danh-muc-cap-1");
  };
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
                onChange={handleInputChange("VI")}
                value={name.VI}
              />
            ) : (
              <Input
                placeholder="Nhập vào tên danh danh mục tiếng anh"
                size="large"
                onChange={handleInputChange("EN")}
                value={name.EN}
              />
            )}
            <div className="admin__main-wall"></div>
            <label className="admin__main-label">
              <StarFilled style={{ marginRight: 5 }} />
              Đường dẫn
            </label>

            <Input
              addonBefore={process.env.NEXT_PUBLIC_FULL_URL + "/san-pham/"}
              placeholder=""
              size="large"
              onChange={(e) => setLink(e.target.value)}
              value={link}
            />
          </div>
          <div className="admin__main-save">
            <Button type="default" onClick={handleReject}>Hủy</Button>
            <Button type="primary" style={{ marginLeft: 10 }} onClick={handleSubmit}>
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default App;
