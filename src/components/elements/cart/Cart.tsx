import React, { Fragment, useContext, useState } from "react";
import { Product, cartActions } from "@slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import CartItem from "./CartItem";
import router from "next/router";
import Image from "next/image";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";

interface CartProps {
  items: Product[];
  showCheckbox: boolean;
}

const Cart: React.FC<CartProps> = (props) => {
  const [itemToBeDeleted, setItemToBeDeleted] = useState(0);
  const [text, setText] = useState(viText);
  const allItemsSelected = useSelector(
    (state: ReturnType<typeof store.getState>) => state.cart.allSelected
  );
  const dispatch = useDispatch();
  const cartItems = props.items;
  const [isModalItemOpen, setIsModalItemOpen] = useState(false);

  const checkOneItemHandler = (id: number) => {
    dispatch(cartActions.checkItem(id));
  };

  const checkAllItemsHandler = () => {
    dispatch(cartActions.checkAllItems());
  };

  const addItemHandler = (item: Product) => {
    dispatch(cartActions.addItemToCart(item));
  };

  const decreaseItemQuantityHandler = (id: number) => {
    dispatch(cartActions.decreaseItemQuantity(id));
  };

  const confirmOrderHandler = () => {
    router.push("/don-hang");
  };

  const confirmDeleteItemsHandler = () => {
    dispatch(
      cartActions.removeItemFromCart(
        cartItems.filter((item) => item.selected).map((item) => item.id)
      )
    );
    setIsModalItemOpen(false);
    if (allItemsSelected) {
      cartActions.toggleSelected();
    }
  };

  const confirmDeleteItemHandler = () => {
    dispatch(cartActions.removeItemFromCart([itemToBeDeleted]));
    setIsModalItemOpen(false);
  };

  const deleteItemHandler = (id: number) => {
    setItemToBeDeleted(id);
    setIsModalItemOpen(true);
  };

  const deleteItemsHandler = () => {
    setIsModalItemOpen(true);
  };

  const handleCancel = () => {
    setIsModalItemOpen(false);
  };

  const totalOrderItems = cartItems
    .filter((item) => item.selected)
    .reduce((currNumber, item) => currNumber + item.quantity, 0);

  return (
    <Fragment>
      <Modal
        centered
        visible={isModalItemOpen}
        onCancel={handleCancel}
        className="products-cart-modal"
        footer={[]}
      >
        <p className="products-cart-modal-title">{text.carts.NOTICAL1}</p>
        <p className="products-cart-modal-description">
          {text.carts.NOTICAL_TEXT1} {text.carts.NOTICAL_TEXT2}
        </p>
        <div className="products-cart-modal-group">
          <div
            className="products-cart-modal-group-btn1"
            onClick={handleCancel}
          >
            {text.button.BUTTON13}
          </div>
          <div
            className="products-cart-modal-group-btn2"
            onClick={
              itemToBeDeleted
                ? confirmDeleteItemHandler
                : confirmDeleteItemsHandler
            }
          >
            {text.button.BUTTON14}
          </div>
        </div>
      </Modal>
      <div className="products-cart">
        {props.items.length > 0 ? (
          <table className="products-cart-table">
            <thead>
              <tr className="products-cart-table-header">
                {props.showCheckbox && (
                  <th className="products-cart-table-header-0">
                    <input
                      type="checkbox"
                      className="products-cart-table-input"
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                      checked={allItemsSelected}
                      onChange={checkAllItemsHandler}
                    />
                  </th>
                )}
                {totalOrderItems > 0 && (
                  <>
                    <th className="products-cart-table-header-1">
                      {text.carts.MENU1} {props.showCheckbox && `(${totalOrderItems})`}
                    </th>
                    <th className="products-cart-table-header-2"></th>
                    <th className="products-cart-table-header-3"></th>
                    <th className="products-cart-table-header-4"></th>
                    <th className="products-cart-table-header-5">
                      {" "}
                      {props.showCheckbox && (
                        <DeleteOutlined onClick={deleteItemsHandler} />
                      )}
                    </th>
                  </>
                )}

                {totalOrderItems === 0 && (
                  <>
                    <th className="products-cart-table-header-1">
                      {text.carts.MENU1}
                    </th>
                    <th className="products-cart-table-header-2">
                      {text.carts.MENU2}
                    </th>
                    <th className="products-cart-table-header-3">
                      {text.carts.MENU3}
                    </th>
                    <th className="products-cart-table-header-4">
                      {text.carts.MENU4}
                    </th>
                    <th className="products-cart-table-header-5"></th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="products-cart-table-body">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  unknownPrice={text.carts.LABEL1}
                  onAddItem={addItemHandler.bind(null, item)}
                  onCheckOneItem={checkOneItemHandler.bind(null, item.id)}
                  onCheckAllItems={checkAllItemsHandler}
                  onConfirmOrder={confirmOrderHandler}
                  onRemoveItem={decreaseItemQuantityHandler.bind(null, item.id)}
                  onDeleteModal={deleteItemHandler.bind(null, item.id)}
                  showCheckbox={props.showCheckbox}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="products-cart-embty">
            <Image
              src="/images/cart_empty.png"
              width={300}
              height={220}
              alt="Giỏ hàng trống"
              className="products-cart-embty-img"
            />
            <h3 className="products-cart-embty-text">
              {text.carts.NOTICAL_TEXT3}
            </h3>
          </div>
        )}

        {props.showCheckbox && (
          <div className="products-cart-infor">
            <div className="products-cart-infor-header">
              <div className="products-cart-infor-title">
                {text.carts.TITLE}
              </div>
              <div className="products-cart-infor-block">
                <div className="products-cart-infor-block-title">
                  {text.carts.LABEL1}{" "}
                  <span className="products-cart-infor-block-title-s">
                    ({totalOrderItems} {text.carts.LABEL2})
                  </span>
                </div>
                <div className="products-cart-infor-block-number">
                  {text.products.PRICE}
                </div>
              </div>
              <div className="products-cart-infor-blockt">
                <div className="products-cart-infor-blockt-title">
                  {text.carts.LABEL3}
                </div>
                <div className="products-cart-infor-blockt-number">
                  {text.products.PRICE}
                </div>
              </div>
              <div className="products-cart-infor-sub">{text.carts.LABEL4}</div>
            </div>
            <div
              className={
                cartItems.filter((item) => item.selected).length > 0
                  ? "products-cart-infor-btn"
                  : "products-cart-infor-btn-dis"
              }
              onClick={confirmOrderHandler}
            >
              {text.carts.NOTICAL2}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default Cart;
