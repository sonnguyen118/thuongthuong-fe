import React, { useState, useEffect } from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { Tabs, Button, Input, Select, Form, notification } from "antd";
import type { TabsProps } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import { OrderAdmin } from "@service";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@slices/loadingState";
import DateTime from "@utils/Functions/DateTime";

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
interface dataOrder {
  id: 1;
  name: string;
  address: string;
  phone: string;
  email: string;
  time: null | string;
  description: null | string;
  status: 1;
  softDeleted: 0;
  createdAt: "2023-07-15T04:31:44.326Z";
  updatedAt: "2023-07-15T04:31:44.326Z";
  products: any;
}

const App: React.FC = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState<dataOrder>();
  const { id } = router.query;
  // lấy toàn bộ dữ liệu
  useEffect(() => {
    const body = {
      id: id,
    };
    dispatch(setLoading(true));
    OrderAdmin.handleGetOrder(body)
      .then((result: any) => {
        // Xử lý kết quả trả về ở đây
        const { data, meta } = result;
        if (meta.status === 200) {
          if (data.orders?.length > 0) {
            setData(data.orders[0]);
          }
        }
        dispatch(setLoading(false));
      })
      .catch((error: any) => {
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
      title: `Đơn hàng`,
      link: "/admin/don-hang",
    },
    {
      id: 3,
      title: "Chi tiết đơn hàng",
      link: "/admin/don-hang/chi-tiet-don-hang",
    },
  ];
  const handleSubmit = () => {
    const body = {
      id: Number(id),
      status: 0,
    };
    dispatch(setLoading(true));
    OrderAdmin.handleChangeStatus(body)
      .then((result: any) => {
        notification.success({
          message: "Duyệt thành công",
          description: "Bạn đã tiến hành xác nhận đơn hàng này đã được duyệt",
          duration: 1.5,
          onClose: () => {
            dispatch(setLoading(false));
            router.push("/admin/don-hang");
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
  return (
    <Dashboard>
      <div className="admin__main-wrap">
        <NavigationAdmin
          header={"Chi tiết đơn hàng"}
          description={"Trang quản lý chi tiết đơn hàng"}
          data={navigationData}
        />
        {data && (
          <>
            {" "}
            <div className="admin-order-wrap">
              <div className="admin-order-wrap-title">
                Khách hàng:{" "}
                <span className="admin-order-wrap-title-hightlight">
                  {data.name}
                </span>
              </div>
              <div className="admin-order-wrap-title">
                Số điện thoại:{" "}
                <span className="admin-order-wrap-title-hightlight">
                  {data.phone}
                </span>
              </div>
              <div className="admin-order-wrap-title">
                Địa chỉ:{" "}
                <span className="admin-order-wrap-title-hightlight">
                  {data.address}
                </span>
              </div>
              <div className="admin-order-wrap-title">
                Email:{" "}
                <span className="admin-order-wrap-title-hightlight">
                  {data.email}
                </span>
              </div>
              <div className="admin-order-wrap-cart">
                <div className="admin-order-wrap-cart-title">
                  Khách đã đặt hàng gồm các sản phẩm sau
                </div>
                <div className="admin-order-wrap-cart-list">
                  {data.products?.map((product: any, index: any) => (
                    <div
                      className="admin-order-wrap-cart-list-item"
                      key={index}
                    >
                      <div className="admin-order-wrap-cart-list-item-stt">
                        {index + 1}.{" "}
                      </div>
                      <div className="admin-order-wrap-cart-list-item-name">
                        {product.name}
                      </div>
                      <div className="admin-order-wrap-cart-list-item-sl">
                        Số lượng: {product.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="admin__main-save">
              {!data.status ? (
                <>
                  <span style={{ color: "red", marginRight: 20 }}>
                    Đơn hàng này đã được duyệt vào lúc{" "}
                    {DateTime.formatExacthlyTime(data.updatedAt)}
                  </span>
                </>
              ) : (
                <>
                  <Button type="default">Hủy</Button>
                  <Button
                    type="primary"
                    style={{ marginLeft: 10 }}
                    onClick={handleSubmit}
                  >
                    Duyệt
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Dashboard>
  );
};

export default App;
