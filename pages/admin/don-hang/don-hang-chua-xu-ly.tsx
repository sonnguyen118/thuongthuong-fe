import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { FilterAdminTable } from "@components/molecules/FilterAdmin";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
interface buttonProps {
  isButton: boolean;
  style: string;
  title: string;
  link: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: "Tên Khách Hàng",
    dataIndex: "name",
  },
  {
    title: "Tên Mặt Hàng",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
interface NavigationProps {
  id: number;
  title: string;
  link: string;
}
const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigationData: NavigationProps[] = [
    {
      id: 1,
      title: `Trang chủ`,
      link: "/admin",
    },
    {
      id: 2,
      title: `Đơn hàng`,
      link: "/admin/don-hang",
    },
    {
      id: 3,
      title: `Danh sách đơn hàng chưa xử lý`,
      link: "/",
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

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
  const optionsSelector = [
    {
      value: "1",
      label: "Select",
    },
  ];
  const button: buttonProps = {
    isButton: false,
    style: "",
    title: "",
    link: "",
  };
  return (
    <Dashboard>
      <div className="admin__main-wrap">
        <NavigationAdmin
          header={"Danh sách đơn hàng chưa xử lý"}
          description={"Trang quản lý danh sách đơn hàng mà bạn chưa xử lý"}
          data={navigationData}
        />
        <div className="admin__main-content">
          <FilterAdminTable
            isSelector={false}
            optionsSelector={optionsSelector}
            isDatepicker={true}
            titleFilter={"Hiển thị tất cả đơn hàng từ"}
            placeholderInput={"Tìm kiếm theo tên khách hàng"}
            button={button}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default App;
