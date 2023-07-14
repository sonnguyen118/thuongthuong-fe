import React, {useState, useEffect} from "react";
import Image from "next/image"
import {Button, InputNumber} from "antd";
import {SlideProductsHome} from "@components/elements/Slider";


interface DataProps {
    title : string
    data: Array<any>
}
const ProductsSeems = (props :DataProps) => {
    const {title, data} = props;

    return (
        <div className="products-seems">
            <div className="products-seems-title">
                {title.toUpperCase()}
            </div>
            <SlideProductsHome data={data}/>
        </div>
    );
};
export default ProductsSeems;
