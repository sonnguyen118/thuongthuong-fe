import React from "react";
import {
  ExclamationCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import Image from "next/image";

type PopsData = {
  header: string;
  total: number;
  image: string;
  infor1: string;
  infor2: string;
  footer: string;
  number: string;
};
const CardStatisticalAdmin = (props: PopsData) => {
  const { header, total, image, infor1, infor2, footer, number } = props;
  return (
    <>
      <div className="admin__main-card-item">
        <div className="admin__main-card-item-header">
          <span className="admin__main-card-item-header-title">{header}</span>
          <ExclamationCircleOutlined className="admin__main-card-item-header-icon" />
        </div>
        <div className="admin__main-card-item-main">
          <div className="admin__main-card-item-main-wrap">
            <Image
              src={image}
              width={80}
              height={80}
              alt="thuongthuong"
              className="admin__main-card-item-main-img"
            />
            <span className="admin__main-card-item-main-title">{total}</span>
          </div>
          <div className="admin__main-card-item-main-infor">
            <div className="admin__main-card-item-main-infor-item">
              <span className="admin__main-card-item-main-infor-item-title">
                Tuần Trước
              </span>
              <CaretUpOutlined
                className={
                  Number(infor1) > 0
                    ? "admin__main-card-item-main-infor-item-icon-up"
                    : "admin__main-card-item-main-infor-item-icon-down"
                }
              />
              <span
                className={
                  Number(infor1) > 0
                    ? "admin__main-card-item-main-infor-item-number-up"
                    : "admin__main-card-item-main-infor-item-number-down"
                }
              >
                {infor1}%
              </span>
            </div>
            <div className="admin__main-card-item-main-infor-item">
              <span className="admin__main-card-item-main-infor-item-title">
                Tháng Trước
              </span>
              <CaretDownOutlined
                className={
                  Number(infor2) > 0
                    ? "admin__main-card-item-main-infor-item-icon-up"
                    : "admin__main-card-item-main-infor-item-icon-down"
                }
              />
              <span
                className={
                  Number(infor2) > 0
                    ? "admin__main-card-item-main-infor-item-number-up"
                    : "admin__main-card-item-main-infor-item-number-down"
                }
              >
                {infor2}%
              </span>
            </div>
          </div>
        </div>
        <div className="admin__main-card-item-footer">
          {footer}: <strong>{number}</strong>
        </div>
      </div>
    </>
  );
};

export default CardStatisticalAdmin;
