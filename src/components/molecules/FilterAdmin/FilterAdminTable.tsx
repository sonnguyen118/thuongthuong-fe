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
interface buttonProps {
  isButton: boolean;
  style: string;
  title: string;
  link: string;
}
interface FilterAdminTableProps {
  isSelector: boolean;
  isDatepicker: boolean;
  titleFilter: string;
  placeholderInput: string;
  optionsSelector: optionsSelectorprops[];
  button: buttonProps;
}
interface DropdownFilterProps {
  isSelector: boolean;
  isDatepicker: boolean;
  titleFilter: string;
  optionsSelector: optionsSelectorprops[];
}

const CustomComponent: React.FC<DropdownFilterProps> = ({
  isSelector,
  optionsSelector,
  isDatepicker,
  titleFilter,
}) => (
  <div className="admin__main-filter-button-dropdown">
    <div className="admin__main-filter-button-dropdown-title">
      Thêm điều kiện lọc
    </div>
    <div className="admin__main-filter-button-dropdown-body">
      <div className="admin__main-filter-button-dropdown-body-title">
        {titleFilter}
      </div>
      {isSelector && (
        <>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={optionsSelector}
          />
        </>
      )}
      {isDatepicker && (
        <>
          <DatePicker
            format={dateFormat}
            className="admin__main-filter-button-dropdown-body-picker"
          />
          <div className="admin__main-filter-button-dropdown-body-title">
            đến
          </div>
          <DatePicker
            format={dateFormat}
            className="admin__main-filter-button-dropdown-body-picker"
          />
        </>
      )}

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
  isSelector,
  optionsSelector,
  isDatepicker,
  titleFilter,
  placeholderInput,
  button,
}) => {
  const router = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="admin__main-filter">
      <Dropdown
        overlay={
          <CustomComponent
            isSelector={isSelector}
            optionsSelector={optionsSelector}
            isDatepicker={isDatepicker}
            titleFilter={titleFilter}
          />
        }
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
        placeholder={placeholderInput}
        prefix={<SearchOutlined />}
        className="admin__main-filter-input"
      />
      {button.isButton && (
        <Button
          type="primary"
          className="admin__main-filter-grbtn"
          onClick={(e) => {
            router.push(button.link);
          }}
        >
          {button.style === "add" ? (
            <PlusOutlined />
          ) : (
            <>{button.style === "edit" ? <FormOutlined /> : <></>}</>
          )}

          {button.title}
        </Button>
      )}
    </div>
  );
};

export default FilterAdminTable;
