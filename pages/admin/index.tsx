import React, { useEffect, useState } from "react";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { MenuProps } from "antd";
import { Menu, DatePicker } from "antd";
import Image from "next/image";
import { CardStatisticalAdmin } from "@components/elements/card";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import classes from "./admin.module.css";

interface PageSEOData {
  name: string;
  pageSEO: {
    title: string;
    url: string;
    keywords: string;
    description: string;
    image: string;
  };
}
interface NavigationProps {
  id: number;
  title: string;
  link: string;
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Thống kê các Đơn hàng - Liên hệ trong 5 tuần gần nhất",
      position: "bottom" as const,
    },
  },
};
const { RangePicker } = DatePicker;
const labels = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4", "Tuần 5"];
export const data = {
  labels,
  datasets: [
    {
      label: "Đơn hàng",
      data: [11, 25, 13, 41, 5],
      backgroundColor: "#ff731d",
    },
    {
      label: "Liên hệ",
      data: [11, 21, 30, 41, 5],
      backgroundColor: "#1677ff",
    },
  ],
};

const items: MenuProps["items"] = [
  {
    label: "5 tuần gần nhất",
    key: "1",
  },
  {
    label: "5 tháng gần nhất",
    key: "2",
  },
  {
    label: (
      <>
        <RangePicker />
      </>
    ),
    key: "3",
  },
];
const AdminMain: React.FC = () => {
  const [current, setCurrent] = useState("mail");
  const router = useRouter();
  const [cookies] = useCookies(["accessToken"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!cookies.accessToken) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [cookies, router]);

  if (isLoading) {
    return <div className={classes.loader}></div>;
  }

  const pageSEOData: PageSEOData = {
    name: "Thương Thương",
    pageSEO: {
      title: "Trang Quản Trị | Thương Thương",
      url: "https://www.critistudio.top",
      keywords: "website",
      description:
        "Thuong Thuong tổ chức đào tạo nghề cho đối tượng người khuyết tật và người yếu thế nhằm giảm gánh nặng cho gia đình và xã hội.",
      image: "https://www.critistudio.top/images/seo.jpg",
    },
  };

  const navigationData: NavigationProps[] = [
    {
      id: 1,
      title: `Trang chủ`,
      link: "/",
    },
    {
      id: 2,
      title: `Tổng quan`,
      link: "/",
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
  const image = "";
  return (
    <>
      <HeadSEO pageSEO={pageSEOData.pageSEO} url={url} image={image} />
      <Dashboard>
        <div className="admin__main-wrap">
          <NavigationAdmin
            header={"Mừng bạn đã quay trở lại"}
            description={
              "Chào mừng đến trang quản trị Thương Thương, bạn có thể chỉnh sửa giao diện và thao tác dữ liệu trên trang"
            }
            data={navigationData}
          />
          {/* <div className="admin__main">
            <div className="admin__main-card">
              <CardStatisticalAdmin
                header={"Số lượng đơn hàng"}
                total={520}
                image={"/images/admin/incon_index1.png"}
                infor1={"-10"}
                infor2={"+3"}
                footer={"số đơn trong ngày"}
                number={"5 đơn"}
              />
              <CardStatisticalAdmin
                header={"Số lượng liên hệ"}
                total={127}
                image={"/images/admin/incon_index2.png"}
                infor1={"-15"}
                infor2={"+5"}
                footer={"số liên hệ trong ngày"}
                number={"2 liên hệ"}
              />
            </div>
            <div className="admin__main-chart">
              <div className="admin__main-chart-header">
                <Menu
                  onClick={onClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  items={items}
                />
              </div>
              <div className="admin__main-chart-main">
                <div className="admin__main-chart-item">
                  <h3 className="admin__main-chart-item-header">
                    Bảng thống kê Đơn hàng & Liên hệ
                  </h3>
                  <Bar options={options} data={data} />
                </div>
                <div className="admin__main-chart-list">
                  <h3 className="admin__main-chart-list-header">
                    Thống kê Đơn hàng gần nhất
                  </h3>
                  <ul className="admin__main-chart-list-ul">
                    <li className="admin__main-chart-list-ul-li">
                      <span className="admin__main-chart-list-ul-li-stt">
                        1
                      </span>
                      <span className="admin__main-chart-list-ul-li-title">
                        Máy khoan cầm tay
                      </span>
                      <span className="admin__main-chart-list-ul-li-time">
                        18:00 22/04/2023
                      </span>
                    </li>
                    <li className="admin__main-chart-list-ul-li">
                      <span className="admin__main-chart-list-ul-li-stt">
                        2
                      </span>
                      <span className="admin__main-chart-list-ul-li-title">
                        Máy khoan cầm tay
                      </span>
                      <span className="admin__main-chart-list-ul-li-time">
                        18:00 22/04/2023
                      </span>
                    </li>
                    <li className="admin__main-chart-list-ul-li">
                      <span className="admin__main-chart-list-ul-li-stt">
                        3
                      </span>
                      <span className="admin__main-chart-list-ul-li-title">
                        Máy khoan cầm tay
                      </span>
                      <span className="admin__main-chart-list-ul-li-time">
                        18:00 22/04/2023
                      </span>
                    </li>
                    <li className="admin__main-chart-list-ul-li">
                      <span className="admin__main-chart-list-ul-li-stt">
                        4
                      </span>
                      <span className="admin__main-chart-list-ul-li-title">
                        Máy khoan cầm tay
                      </span>
                      <span className="admin__main-chart-list-ul-li-time">
                        18:00 22/04/2023
                      </span>
                    </li>
                    <li className="admin__main-chart-list-ul-li">
                      <span className="admin__main-chart-list-ul-li-stt">
                        5
                      </span>
                      <span className="admin__main-chart-list-ul-li-title">
                        Máy khoan cầm tay
                      </span>
                      <span className="admin__main-chart-list-ul-li-time">
                        18:00 22/04/2023
                      </span>
                    </li>
                    <li className="admin__main-chart-list-ul-li">
                      <span className="admin__main-chart-list-ul-li-stt">
                        6
                      </span>
                      <span className="admin__main-chart-list-ul-li-title">
                        Máy khoan cầm tay
                      </span>
                      <span className="admin__main-chart-list-ul-li-time">
                        18:00 22/04/2023
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div style={{ color: "red", fontWeight: 600, fontSize: 30 }}>
            Vui Lòng thanh toán phí 2.000.000 VNĐ cọc dịch vụ sử dụng website...
            <br></br>
          </div> */}
        </div>
      </Dashboard>
    </>
  );
};

export default AdminMain;
