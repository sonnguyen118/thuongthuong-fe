import React, { useState, ReactNode } from "react";
import { Button, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { FilterAdminTable } from "@components/molecules/FilterAdmin";
import { useRouter } from "next/router";

interface DataType {
  key: React.Key;
  name: string;
  isActivate: boolean;
  link: string;
}
interface buttonProps {
  isButton: boolean;
  style: string;
  title: string;
  link: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "key",
    render: (text) => <>{text}</>,
  },
  {
    title: "Tiêu đề",
    dataIndex: "name",
    render: (text) => <>{text}</>,
  },
  {
    title: "Đường dẫn",
    dataIndex: "link",
    render: (text) => <>{process.env.NEXT_PUBLIC_FULL_URL + text}</>,
  },
  {
    title: "Trạng thái",
    key: "isActivate",
    dataIndex: "isActivate",
    render: (_, { isActivate }) => (
      <>
        {isActivate ? (
          <Tag color={"green"}>Hiển thị</Tag>
        ) : (
          <Tag color={"volcano"}>Đang ẩn</Tag>
        )}
      </>
    ),
  },
  {
    title: "Thao tác",
    dataIndex: "address",
    render: (text, record) => record.action,
  },
];

const data: DataType[] = [
{
    key: 1,
    name: "Trang Chủ",
    isActivate: true,
    link: "/"
},
{
    key: 2,
    name: "Giới Thiệu",
    isActivate: true,
    link: "/gioi-thieu"
},
{
    key: 3,
    name: "Tin Tức",
    isActivate: true,
    link: "/tin-tuc"
},
{
    key: 1,
    name: "Sản Phẩm",
    isActivate: true,
    link: "/san-pham"
},
{
    key: 4,
    name: "Tuyển Dụng",
    isActivate: true,
    link: "/tuyen-dung"
},
{
    key: 5,
    name: "Liên Hệ",
    isActivate: true,
    link: "/lien-he"
},
];

interface NavigationProps {
  id: number;
  title: string;
  link: string;
}
const App: React.FC = () => {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigationData: NavigationProps[] = [
    {
      id: 1,
      title: `Trang chủ`,
      link: "/admin",
    },
    {
      id: 2,
      title: `Layout`,
      link: "/admin/layout",
    },
    {
      id: 3,
      title: `Danh sách menu`,
      link: "/",
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const optionsSelector = [
    {
      value: "1",
      label: "Tranh Giấy",
    },
    {
      value: "2",
      label: "Sơn Mài",
    },
    {
      value: "3",
      label: "Đồ Gia Dụng",
    },
  ];
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const button: buttonProps = {
    isButton: true,
    style: "add",
    title: "Tạo menu",
    link: "/admin/layout/menu/tao-moi",
  };
  return (
    <Dashboard>
      <div className="admin__main-wrap">
        <NavigationAdmin
          header={"Danh sách Menu - Navbar"}
          description={
            "Trang quản lý danh sách menu - navbar"
          }
          data={navigationData}
        />
        <div className="admin__main-content">
          <FilterAdminTable
            isSelector={true}
            optionsSelector={optionsSelector}
            isDatepicker={false}
            titleFilter={"Lọc theo danh mục cấp 1"}
            placeholderInput={"Tìm kiếm theo tiêu đề danh mục"}
            button={button}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  router.push(`/admin/danh-muc/danh-muc-cap-2/${record.key}`); // Perform router push on row click
                },
              };
            }}
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default App;
