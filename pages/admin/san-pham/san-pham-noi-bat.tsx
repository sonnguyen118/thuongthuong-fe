import React, { useState, ReactNode, useMemo, useEffect } from "react";
import { Button, Table, Tag, Switch, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { FilterAdminProducts } from "@components/molecules/FilterAdmin";
import { useRouter } from "next/router";
import Image from "next/image";
import { handleProducts } from "@service";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@slices/loadingState";
import * as process from "process";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
};

interface NavigationProps {
  id: number;
  title: string;
  link: string;
}
const App: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataProducts, setDataProducts] = useState([]);
  // lấy dữ liệu
  useEffect(()=>{
    handleProducts.handleGetHighlight()
    .then((result:any)=>{
      const {meta, data} = result;
      setDataProducts(data.products);
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
      title: `Sản Phẩm`,
      link: "/admin/toan-bo-san-pham",
    },
    {
      id: 3,
      title: `Sản Phẩm Nổi Bật`,
      link: "/",
    },
  ];
  const handleGoDetailt = (record: any) => {
    router.push(`/admin/san-pham/chinh-sua-san-pham/${record.id}`);
  };
  const handledeleteProducts =(record : any) => {
    const body = {
      id: record.id,
      isActive: false,
      softDeleted: true,
    };
    dispatch(setLoading(true));
    handleProducts
      .handleUpdateStatus(body)
      .then((result:any) => {
        // Xử lý kết quả trả về ở đây
        notification.success({
          message: "Xoá thành công",
          description: "Bạn đã tiến hành xóa thành công sản phẩm này",
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
            // router.reload();
          },
        });
      });
  };
  const handleChangeStaus = (record: any) => {
    const body = {
      id: record.id,
      isActive: !record.isActive,
      softDeleted: false,
    };
    dispatch(setLoading(true));
    handleProducts
      .handleUpdateStatus(body)
      .then((result:any) => {
        // Xử lý kết quả trả về ở đây
        notification.success({
          message: "Xoá thành công",
          description: "Bạn đã tiến hành cập nhật trạng thái thành công sản phẩm này",
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
            // router.reload();
          },
        });
      });
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text, index) => <>{text}</>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      render: (text) => (
        <Image src={process.env.NEXT_PUBLIC_API_URL + "/" + text} width={60} height={60} alt="ảnh sản phẩm"></Image>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text) => <>{text}</>,
    },

    {
      title: "Danh mục cấp 1",
      dataIndex: "danhMuc1",
      render: (text) => <>{text.name}</>,
    },
    {
      title: "Danh mục cấp 2",
      dataIndex: "danhMuc2",
      render: (text) => <>{text.name}</>,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      render: (isActive, record) => (
        <Switch
          checkedChildren="Đang hiện"
          unCheckedChildren="Đang ẩn"
          defaultChecked={isActive}
          onChange={()=>handleChangeStaus(record)}
        />
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "link",
      render: (link, record) => (
        <>
          <Button onClick={(e)=> handleGoDetailt(record)}><EditOutlined /></Button>
          <Button style={{marginLeft: 15}} onClick={()=> handledeleteProducts(record)}><DeleteOutlined/></Button>
        </>
      ),
    }
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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
    onChange: onSelectChange
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
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default App;
