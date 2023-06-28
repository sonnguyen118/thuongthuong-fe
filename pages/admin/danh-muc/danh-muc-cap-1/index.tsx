import React, { useState, ReactNode, useEffect } from "react";
import { Table, Button, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { FilterAdminTable } from "@components/molecules/FilterAdmin";
import { useRouter } from "next/router";
import { handleCategory } from "@service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setLoading } from "@slices/loadingState";

interface DataType {
  id: number;
  description: string;
  key: React.Key;
  name: string;
  isActive: boolean;
  isHighlight: boolean;
  link: string;
  action: ReactNode;
  parent: any;
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
  const dispatch = useDispatch();
  const router = useRouter();
  const handleGoDetailt = (link: string) => {
    router.push(`/admin/danh-muc/danh-muc-cap-1${link}`);
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState();
  console.log(data, "data");
  useEffect(() => {
    const body = {
      language: "VI",
    };
    dispatch(setLoading(true));
    handleCategory
      .handleGetAllCategory()
      .then((result:any) => {
        // Xử lý kết quả trả về ở đây
        setData(result);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        // Xử lý lỗi ở đây
        console.log(error);
        dispatch(setLoading(false));
      });
  }, []);

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
      title: "Đường dẫn",
      dataIndex: "link",
      render: (text) => <>{text}</>,
    },
    {
      title: "Thao tác",
      dataIndex: "link",
      render: (link, record) => (
        <>
          <Button onClick={(e)=> handleGoDetailt(link)}><EditOutlined /></Button>
          <Button style={{marginLeft: 15}} onClick={()=> handledeleteCategory(record)}><DeleteOutlined/></Button>
        </>
      ),
    }
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const handledeleteCategory =(record : any) => {
    console.log(record, "onDelete");
      const body = {
        id: record.id,
        isActive: false,
        softDeleted: true,
      };
      dispatch(setLoading(true));
      handleCategory
        .handleUpdateStatus(body)
        .then((result:any) => {
          // Xử lý kết quả trả về ở đây
          notification.success({
            message: "Xoá thành công",
            description: "Bạn đã tiến hành xóa thành công danh mục sản phẩm này",
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
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default App;
