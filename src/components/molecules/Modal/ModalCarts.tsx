import React from "react";
import Image from "next/image";

const ModalCarts = () => {
  return (
    <div className="modal-cart">
      <Image
        src={"/icon/succeed.png"}
        width={100}
        height={100}
        alt={"Thương Thương"}
        className="modal-cart-img"
      />
      <div className="modal-cart-text">Sản phẩm đã được thêm vào giỏ hàng</div>
    </div>
  );
};

export default ModalCarts;
