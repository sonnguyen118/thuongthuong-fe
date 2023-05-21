import React, { useState, useEffect } from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { Tabs, Button, Input, Select, Upload } from "antd";
import type { TabsProps } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { CkeditorEnable } from "@components/molecules/ckeditor";

const { TextArea } = Input;
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChangeImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

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
      title: `Sản phẩm`,
      link: "/admin/san-pham",
    },
    {
      id: 3,
      title: "Tạo mới sản phẩm",
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
  const onChangeTextarea = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
  };
  const itemDecription: TabsProps["items"] = [
    {
      key: "1",
      label: `Tiếng Việt`,
      children: (
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120, marginBottom: 24 }}
          onChange={onChangeTextarea}
          placeholder="Nhập mô tả ngắn về sản phẩm"
        />
      ),
    },
    {
      key: "2",
      label: `Tiếng Anh`,
      children: (
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120, marginBottom: 24 }}
          onChange={onChangeTextarea}
          placeholder="Nhập mô tả ngắn về sản phẩm"
        />
      ),
    },
    {
      key: "3",
      label: `Tiếng Pháp`,
      children: (
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120, marginBottom: 24 }}
          onChange={onChangeTextarea}
          placeholder="Nhập mô tả ngắn về sản phẩm"
        />
      ),
    },
    {
      key: "4",
      label: `Tiếng Bồ Đào Nha`,
      children: (
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120, marginBottom: 24 }}
          onChange={onChangeTextarea}
          placeholder="Nhập mô tả ngắn về sản phẩm"
        />
      ),
    },
  ];
  const itemCKeditor: TabsProps["items"] = [
    {
      key: "1",
      label: `Tiếng Việt`,
      children: <CkeditorEnable />,
    },
    {
      key: "2",
      label: `Tiếng Anh`,
      children: <CkeditorEnable />,
    },
    {
      key: "3",
      label: `Tiếng Pháp`,
      children: <CkeditorEnable />,
    },
    {
      key: "4",
      label: `Tiếng Bồ Đào Nha`,
      children: <CkeditorEnable />,
    },
  ];
  return (
    <Dashboard>
      <div className="admin__main-wrap">
        <NavigationAdmin
          header={"Tạo mới sản phẩm"}
          description={"Trang quản lý - thêm mới sản phẩm"}
          data={navigationData}
        />
        <div className="admin__main-content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div className="admin__main-cards-left">
              <div
                className="admin__main-cards"
                style={{ marginBottom: "20px" }}
              >
                <label className="admin__main-label">
                  <StarFilled style={{ marginRight: 5 }} />
                  Tên sản phẩm
                </label>
                <Tabs activeKey={activeTab} items={items} onChange={onChange} />
              </div>
              <div
                className="admin__main-cards"
                style={{ marginBottom: "20px" }}
              >
                <label className="admin__main-label">
                  <StarFilled style={{ marginRight: 5 }} />
                  Đường dẫn
                </label>

                <Input
                  addonBefore={
                    process.env.NEXT_PUBLIC_FULL_URL + "/chi-tiet-san-pham/"
                  }
                  placeholder=""
                  size="large"
                />
              </div>
              <div
                className="admin__main-cards"
                style={{ marginBottom: "20px" }}
              >
                <label className="admin__main-label">
                  <StarFilled style={{ marginRight: 5 }} />
                  Mô tả ngắn
                </label>
                <Tabs
                  activeKey={activeTab}
                  items={itemDecription}
                  onChange={onChange}
                />
              </div>
              <div
                className="admin__main-cards"
                style={{ marginBottom: "20px" }}
              >
                <label className="admin__main-label">
                  <StarFilled style={{ marginRight: 5 }} />
                  Bài viết sản phẩm
                </label>
                <Tabs
                  activeKey={activeTab}
                  items={itemCKeditor}
                  onChange={onChange}
                />
              </div>
              <div
                className="admin__main-cards"
                style={{ marginBottom: "60px" }}
              >
                <div className="admin__main-cards-title">Tối ưu SEO</div>
                <label className="admin__main-label">
                  <StarFilled style={{ marginRight: 5 }} />
                  Title SEO
                </label>
                <TextArea
                  showCount
                  maxLength={60}
                  style={{ height: 40, marginBottom: 12 }}
                  onChange={onChangeTextarea}
                  placeholder="Title SEO"
                />
                <label className="admin__main-label">
                  <StarFilled style={{ marginRight: 5 }} />
                  Description SEO
                </label>
                <TextArea
                  showCount
                  maxLength={150}
                  style={{ height: 80, marginBottom: 12 }}
                  onChange={onChangeTextarea}
                  placeholder="Description SEO"
                />
                <label className="admin__main-label">
                  <StarFilled style={{ marginRight: 5 }} />
                  Keywords SEO
                </label>
                <TextArea
                  showCount
                  maxLength={120}
                  style={{ height: 60, marginBottom: 12 }}
                  onChange={onChangeTextarea}
                  placeholder="Keywords SEO"
                />
              </div>
            </div>
            <div className="admin__main-cards-right">
              <div className="admin__main-cards" style={{ marginBottom: 20 }}>
                <div className="admin__main-cards-title">Danh Mục</div>
                <label className="admin__main-label">
                  <StarFilled style={{ marginRight: 5 }} />
                  Lựa chọn danh mục cấp 1
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
                <label className="admin__main-label">
                  <StarFilled style={{ marginRight: 5 }} />
                  Lựa chọn danh mục cấp 2
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
              </div>
              <div className="admin__main-cards">
                <div className="admin__main-cards-title">Ảnh Sản phẩm</div>
                <div className="admin__main-custom-upload">
                  <ImgCrop rotationSlider>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChangeImage}
                      onPreview={onPreview}
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </div>
              </div>
            </div>
          </div>
          <div className="admin__main-save-products">
            <Button
              size="large"
              type="default"
              className="admin__main-save-products-btn"
            >
              Hủy bỏ
            </Button>
            <Button
              type="primary"
              size="large"
              style={{ marginLeft: 10 }}
              className="admin__main-save-products-btn-2"
            >
              Tạo sản phẩm
            </Button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default App;
