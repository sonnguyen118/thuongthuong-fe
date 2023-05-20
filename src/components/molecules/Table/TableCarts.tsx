import React, { useState } from "react";

type DataItem = {
  id: number;
  product: string;
  price: number;
  quantity: number;
  selected: boolean;
};
const TableCarts = () => {
  const [data, setData] = useState<DataItem[]>([
    { id: 1, product: "Product 1", price: 10, quantity: 2, selected: false },
    { id: 2, product: "Product 2", price: 20, quantity: 1, selected: false },
    { id: 3, product: "Product 3", price: 5, quantity: 4, selected: false },
  ]);
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected: event.target.checked,
        };
      }
      return item;
    });
    setData(newData);
  };
  const renderTableData = () => {
    return data.map((item) => {
      return (
        <tr key={item.id}>
          <td>
            <input
              type="checkbox"
              checked={item.selected || false}
              onChange={(event) => handleCheckboxChange(event, item.id)}
            />
          </td>
          <td>{item.product}</td>
          <td>{item.price}</td>
          <td>{item.quantity}</td>
          <td>{item.price * item.quantity}</td>
        </tr>
      );
    });
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Sản Phẩm</th>
            <th>Đơn Giá</th>
            <th>Số Lượng</th>
            <th>Tạm Tính</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </>
  );
};

export default TableCarts;
