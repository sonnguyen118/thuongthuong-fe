import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { FilterAdminTable } from "@components/molecules/FilterAdmin";
import { ContactAdmin } from "@service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { setLoading } from '@slices/loadingState';
import { useRouter } from "next/router";
import { DateTime } from "@utils/Functions";
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
interface NavigationProps {
  id: number;
  title: string;
  link: string;
}
const App: React.FC = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigationData: NavigationProps[] = [
    {
      id: 1,
      title: `Trang chủ`,
      link: "/admin",
    },
    {
      id: 2,
      title: `Liên Hệ`,
      link: "/admin/lien-he",
    },
    {
      id: 3,
      title: `Danh sách toàn bộ Liên hệ`,
      link: "/",
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  useEffect(()=> {
    const body = {
      status: 1,
      page: 1,
      size: 20 // chỉ lấy ra 5 loại thông báo mới nhất !
    }
    dispatch(setLoading(true));
    ContactAdmin
      .handleGetList(body)
      .then((result:any) => {
        // Xử lý kết quả trả về ở đây
        const {data, meta} = result;
        if(meta.status === 200) {
          setData(data.contact);
          setTotal(data.pagination?.totalRecords ?? 0);
        }
        dispatch(setLoading(false));
      })
      .catch((error:any) => {
        // Xử lý lỗi ở đây
        console.log(error);
        dispatch(setLoading(false));
      });
  },[]);
  const handleGoDetailt = (record: any) => {
    router.push(`/admin/lien-he/${record.id}`);
  };
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
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
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên Khách Hàng",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Thời gian gửi",
      dataIndex: "createdAt",
      render: (createdAt) => (
        <>{DateTime.formatExacthlyTimeTable(createdAt)}</>
      )
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Thao tác",
      render: (record) => (
        <>
          <Button onClick={(e)=> handleGoDetailt(record)}><EditOutlined /></Button>
        </>
      ),
    },
  ];
  return (
    <Dashboard>
      <div className="admin__main-wrap">
        <NavigationAdmin
          header={"Danh sách Liên Hệ chưa xử lý"}
          description={"Trang quản lý danh sách Liên hệ chưa xử lý"}
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
