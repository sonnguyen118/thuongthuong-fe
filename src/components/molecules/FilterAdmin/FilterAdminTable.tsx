import React from "react";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Dropdown, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";

const dateFormat = "YYYY/MM/DD";

interface FilterAdminTableProps {
  placeholderInput: string;
}
const CustomComponent: React.FC = () => (
  <div className="admin__main-filter-button-dropdown">
    <div className="admin__main-filter-button-dropdown-title">
      Thêm điều kiện lọc
    </div>
    <div className="admin__main-filter-button-dropdown-body">
      <div className="admin__main-filter-button-dropdown-body-title">
        Hiển thị tất cả đơn hàng từ
      </div>
      <DatePicker
        format={dateFormat}
        className="admin__main-filter-button-dropdown-body-picker"
      />
      <div className="admin__main-filter-button-dropdown-body-title">đến</div>
      <DatePicker
        format={dateFormat}
        className="admin__main-filter-button-dropdown-body-picker"
      />
      <div className="admin__main-filter-button-dropdown-body-btn">
        <Button
          type="default"
          className="admin__main-filter-button-dropdown-body-btn-item"
        >
          Hủy bỏ
        </Button>
        <Button
          type="primary"
          className="admin__main-filter-button-dropdown-body-btn-item"
        >
          Tiến hành lọc
        </Button>
      </div>
    </div>
  </div>
);
const FilterAdminTable: React.FC<FilterAdminTableProps> = ({
  placeholderInput,
}) => {
  const handleClick = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="admin__main-filter">
      <Dropdown overlay={<CustomComponent />} trigger={["click"]}>
        <Button className="admin__main-filter-button" onClick={handleClick}>
          <FilterOutlined
            style={{ marginRight: 8 }}
            className="admin__main-filter-button-icon"
          />
          Thêm điều kiện lọc
        </Button>
      </Dropdown>

      <Input
        placeholder={placeholderInput}
        prefix={<SearchOutlined />}
        className="admin__main-filter-input"
      />
    </div>
  );
};

export default FilterAdminTable;
