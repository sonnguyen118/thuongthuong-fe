import React, { useState, useEffect } from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { Tabs, Button, Input, Select, Form, notification } from "antd";
import type { TabsProps } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import { handleCategory } from "@service";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@slices/loadingState";
import { normalizeString } from "@utils/Mocks";

interface RootState {
  loading: {
    loading: boolean;
  };
}
interface NavigationProps {
  id: number;
  title: string;
  link: string;
}
type LanguageKey = "VI" | "EN" | "FR" | "PO";
type NameState = {
  [key: string]: string | undefined;
};
const App: React.FC = () => {
  const [name, setName] = useState<{ [key: string]: string | undefined }>({
    VI: undefined,
    EN: undefined,
  });
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies["accessToken"];
  const [link, setLink] = useState("");
  const [parent, setParent] = useState("");
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();
  const router = useRouter();
  const [level2, setLevel2] = useState(false);
  const [category1, setDataCategory1] = useState([{value: "", label: ""}]);
  // lấy toàn bộ danh mục cấp 1
  useEffect(() => {
    dispatch(setLoading(true));
    handleCategory
      .handleGetAllCategory()
      .then((result:any) => {
        // Xử lý kết quả trả về ở đây
        const newArray = result.map((item: any) => ({
          value: item.id,
          label: item.name
        }));
        setDataCategory1(newArray);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        // Xử lý lỗi ở đây
        console.log(error);
        dispatch(setLoading(false));
      });
  }, []);
  console.log(category1, "category1");
  const handleInputChange =
    (languageKey: LanguageKey) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName((prevName) => ({
        ...prevName,
        [languageKey]: event.target.value,
      }));
    };

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

  // hàm lọc title chuyển thành link
  const handleChangeTitleToLink = (value: string) => {
    setName((prevName) => ({
      ...prevName,
      VI: value,
    }));
    const newLink = normalizeString(value);
    setLink(newLink);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Tiếng Việt`,
      children: (
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống tiêu đề tiếng việt!",
            },
          ]}
        >
          <Input
            placeholder="Nhập và tên danh danh mục tiếng việt"
            size="large"
            onChange={(e) => handleChangeTitleToLink(e.target.value)}
            value={name.VI}
          />
        </Form.Item>
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
            onChange={handleInputChange("EN")}
            value={name.EN}
          />
        </>
      ),
    }
  ];

  const onFinish = (values: any) => {
    if (link === "") {
      toast.error("Đường dẫn không được bỏ trống", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    dispatch(setLoading(true));
      const body = {
        name, link, parent
      }
      handleCategory
        .handleCreateCategory(body)
        .then((result: any) => {
          notification.success({
            message: "Tạo thành công",
            description: "Bạn đã thành công tạo mới danh mục sản phẩm",
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
            message: "Tạo danh mục thất bại",
            description: "Đã có lỗi xảy ra trong quá trình tạo danh mục",
            duration: 1.5,
            onClose: () => {
              dispatch(setLoading(false));
            },
          });
        });
  };

  const onFinishFailed = (errorInfo: any) => {
    toast.error(
      errorInfo.errorFields[0]?.errors[0] ||
        "Có lỗi xảy ra vui lòng kiểm tra lại trước khi gửi",
      {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

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
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
                    onChange={(e)=> setParent(e)}
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
                    options={category1}
                  />
                </>
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
              <Button type="default">Hủy</Button>
              <Button
                type="primary"
                style={{ marginLeft: 10 }}
                htmlType="submit"
              >
                Tạo mới
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Dashboard>
  );
};

export default App;
