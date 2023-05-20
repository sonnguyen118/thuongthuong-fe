import React from "react";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

// Define the prop types for this component
interface FilterAdminTableProps {
  placeholderInput: string;
}

const FilterAdminTable: React.FC<FilterAdminTableProps> = ({
  placeholderInput,
}) => {
  return (
    <div className="admin__main-filter">
      <Button>
        <FilterOutlined style={{ marginRight: 8 }} />
        Thêm điều kiện lọc
      </Button>
      <Input placeholder={placeholderInput} prefix={<SearchOutlined />} />
    </div>
  );
};

export default FilterAdminTable;
