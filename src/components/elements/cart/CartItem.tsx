import React, { useState, useEffect, useRef } from "react";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import HeadSEO from "@components/layouts/header/HeadSEO";
import Layout from "@components/layouts/layout/LayoutClient";
import { NavigationTopBar } from "@components/elements/navigation";
import { ProductsSeems } from "@components/templates/products";
import { DeleteOutlined } from "@ant-design/icons";

// sử dụng redux
import { useSelector, useDispatch } from "react-redux";
import { Button, InputNumber, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetchCartData, saveCartData } from "store/actions/cart-actions";
import { Product, cartActions } from "@slices/cartSlice";
import { is } from "ramda";

interface CartItemProps {
  item: Product;
  unknownPrice: string;
  onAddItem: (item: Product) => void;
  onCheckAllItems: () => void;
  onCheckOneItem: (id: number) => void;
  onRemoveItem: (id: number) => void;
  onDeleteModal: (id: number) => void;
  onConfirmOrder: () => void;
  showCheckbox: boolean;
}

const CartItem: React.FC<CartItemProps> = (props) => {
  const item = props.item;

  return (
    <tr key={item.id} className="products-cart-table-body-item">
      {props.showCheckbox && (
        <td className="products-cart-table-body-item-0">
          <input
            type="checkbox"
            checked={item.selected}
            onChange={props.onCheckOneItem.bind(null, item.id)}
            className="products-cart-table-input"
          />
        </td>
      )}
      <td className="products-cart-table-body-item-1">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={80}
          height={80}
          className="products-cart-table-body-item-1-img"
        />
        <span className="products-cart-table-body-item-1-title">
          {item.title}
        </span>
      </td>
      <td className="products-cart-table-body-item-2">
        {item.price === 0 ? props.unknownPrice : item.price} ₫
      </td>
      <td className="products-cart-table-body-item-3">
        <div style={{ display: "flex", alignItems: "center" }}>
          {" "}
          {props.showCheckbox && (
            <Button
              onClick={props.onRemoveItem.bind(null, item.id)}
              className="products-cart-table-body-item-3-btn"
            >
              <span className="products-cart-table-body-item-3-btn-icon">
                -
              </span>
            </Button>
          )}
          {props.showCheckbox && (
            <InputNumber
              value={item.quantity}
              style={{
                color: "black",
                margin: "0 0.2em",
                background: "#fafafa",
                pointerEvents: "none",
              }}
              className="products-cart-table-body-item-3-input"
              disabled
            />
          )}
          {!props.showCheckbox && <div style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 16.5,
                margin: "0 2.2em",
                background: "#fafafa",
                pointerEvents: "none",
              }}>x{item.quantity}</div>}{" "}
          {props.showCheckbox && (
            <Button
              onClick={props.onAddItem.bind(null, item)}
              className="products-cart-table-body-item-3-btn"
            >
              <span className="products-cart-table-body-item-3-btn-icon">
                +
              </span>
            </Button>
          )}
        </div>
      </td>
      <td className="products-cart-table-body-item-4">
        {item.price * item.quantity} ₫
      </td>{" "}
      {props.showCheckbox && (
        <td className="products-cart-table-body-item-5">
          <DeleteOutlined onClick={props.onDeleteModal.bind(null, item.id)} />
        </td>
      )}
    </tr>
  );
};
export default CartItem;
