import React from "react";
import {
  FilterOutlined,
  SearchOutlined,
  PlusOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Input, Dropdown, DatePicker, Select } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
const dateFormat = "YYYY/MM/DD";

interface optionsSelectorprops {
  value: string;
  label: string;
}

interface FilterAdminTableProps {
  optionsSelector: optionsSelectorprops[];
}
interface DropdownFilterProps {
  optionsSelector: optionsSelectorprops[];
}

const CustomComponent: React.FC<DropdownFilterProps> = ({
  optionsSelector,
}) => (
  <div className="admin__main-filter-button-dropdown">
    <div className="admin__main-filter-button-dropdown-title">
      Thêm điều kiện lọc
    </div>
    <div className="admin__main-filter-button-dropdown-body">
      <div className="admin__main-filter-button-dropdown-body-title">
        Theo danh mục cấp 1
      </div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={optionsSelector}
      />
      <div className="admin__main-filter-button-dropdown-body-title">
        Theo danh mục cấp 2
      </div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={optionsSelector}
      />
      <>
        <div className="admin__main-filter-button-dropdown-body-title">
          Theo thời gian tạo
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
      </>

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
const FilterAdminProducts: React.FC<FilterAdminTableProps> = ({
  optionsSelector,
}) => {
  const router = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="admin__main-filter">
      <Dropdown
        overlay={<CustomComponent optionsSelector={optionsSelector} />}
        trigger={["click"]}
      >
        <Button className="admin__main-filter-button" onClick={handleClick}>
          <FilterOutlined
            style={{ marginRight: 4 }}
            className="admin__main-filter-button-icon"
          />
          Thêm điều kiện lọc
        </Button>
      </Dropdown>
      <Input
        placeholder={"Tìm kiếm theo tên sản phẩm"}
        prefix={<SearchOutlined />}
        className="admin__main-filter-input"
      />

      <Button
        type="primary"
        className="admin__main-filter-grbtn"
        onClick={(e) => {
          router.push("/admin/san-pham/tao-moi-san-pham");
        }}
      >
        <PlusOutlined />
        Tạo sản phẩm
      </Button>
    </div>
  );
};

export default FilterAdminProducts;
