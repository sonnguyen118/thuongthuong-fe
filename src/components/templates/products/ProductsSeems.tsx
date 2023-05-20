import React, {useState, useEffect} from "react";
import Image from "next/image"
import {Button, InputNumber} from "antd";
import {SlideProductsHome} from "@components/elements/Slider";


interface DataProps {
    title : string
}
const ProductsSeems = (props :DataProps) => {
    const {title} = props;

    return (
        <div className="products-seems">
            <div className="products-seems-title">
                {title.toUpperCase()}
            </div>
            <SlideProductsHome/>
        </div>
    );
};
export default ProductsSeems;
