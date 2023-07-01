import React, { useState, ReactNode, useMemo, useEffect } from "react";
import { Button, Table, Tag, Switch } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { FilterAdminProducts } from "@components/molecules/FilterAdmin";
import { useRouter } from "next/router";
import Image from "next/image";
import {handleProducts} from "@service";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@slices/loadingState";
interface DataType {
  key: React.Key;
  image: string;
  name: string;
  tags: boolean;
  title1: string;
  title2: string;
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
    render: (text, index) => <>{text}</>,
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
    render: (text) => (
      <Image src={text} width={60} height={60} alt="ảnh sản phẩm"></Image>
    ),
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    render: (text) => <>{text}</>,
  },
  
  {
    title: "Danh mục cấp 1",
    dataIndex: "title1",
    render: (text) => <>{text}</>,
  },
  {
    title: "Danh mục cấp 2",
    dataIndex: "title2",
    render: (text) => <>{text}</>,
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (_, { tags }) => (
      <Switch
        checkedChildren="Tạm ẩn"
        unCheckedChildren="Bỏ ẩn"
        defaultChecked={tags}
      />
    ),
  },
];

interface NavigationProps {
  id: number;
  title: string;
  link: string;
}
const App: React.FC = () => {
  const router = useRouter();
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies["accessToken"];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataProducts, setDataProducts] = useState([]);
  // lấy dữ liệu
  useEffect(()=>{
    const body = {
      language: "VI",
      page: 1,
      size: 50
  }
    handleProducts.handleGetAllProducts(body)
    .then((result:any)=>{
      const {meta, data} = result;
      setDataProducts(data.products);
      console.log(result, "result");
    })
    .catch((error) => {
      console.log(error, "error");
    })
  },[]);
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
          header={"Toàn bộ danh sách sản phẩm"}
          description={"Trang quản lý danh sách hệ thống sản phẩm của bạn"}
          data={navigationData}
        />
        <div className="admin__main-content">
          <FilterAdminProducts optionsSelector={optionsSelector} />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataProducts}
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
