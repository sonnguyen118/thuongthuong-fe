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
  tags: boolean;
  action: ReactNode;
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
    title: "Tiêu đề danh mục",
    dataIndex: "name",
    render: (text) => <>{text}</>,
  },
  {
    title: "Trạng thái",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags ? (
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

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i + 1,
    name: `Edward King ${i}`,
    tags: true,
    action: <Button>Xóa</Button>,
  });
}
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
      title: `Danh mục`,
      link: "/admin/danh-muc",
    },
    {
      id: 3,
      title: `Danh mục cấp 1`,
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
      label: "Lọc theo alphabeta",
    },
    {
      value: "2",
      label: "Lọc theo thời gian tạo",
    },
    {
      value: "3",
      label: "Lọc theo đã ẩn",
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
    title: "Tạo danh mục cấp 1",
    link: "/admin/danh-muc/tao-moi-danh-muc?level=1",
  };
  return (
    <Dashboard>
      <div className="admin__main-wrap">
        <NavigationAdmin
          header={"Danh mục cấp 1"}
          description={
            "Trang quản lý danh sách danh mục cấp 1 trong hệ thống sản phẩm của bạn"
          }
          data={navigationData}
        />
        <div className="admin__main-content">
          <FilterAdminTable
            isSelector={true}
            optionsSelector={optionsSelector}
            isDatepicker={false}
            titleFilter={"Lựa chọn kiểu lọc"}
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
                  router.push(`/admin/danh-muc/danh-muc-cap-1/${record.key}`); // Perform router push on row click
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
