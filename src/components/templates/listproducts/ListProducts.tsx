import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
import { CardProduct } from "@components/elements/card";
import { Product } from "@components/model/Product";
import { PaginationDto } from "@components/model/PaginationDto";
import { Input, Pagination } from "antd";
import { PAGE_SIZE } from "src/constant/constant";
import { productClient } from "@api";
import Image from "next/image";
const { Search } = Input;

interface ListProductsProps {
  products: any;
  pagination: any;
  title: string;
}

const ListProducts: React.FC<ListProductsProps> = (
  props: ListProductsProps
) => {
  const { products, pagination, title } = props;
  console.log(pagination, "pagination");
  const [t, setText] = useState(viText);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  console.log(pagination, "pagination");
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );

  // const getProducts = async (
  //   categoryId: string,
  //   language: string,
  //   page: any,
  //   size: any,
  //   productName?: string
  // ) => {
  //   const res = await productClient.getProductByCategoryId({categoryId, language, page, size, productName});
  //   setProducts(res.data.data.products);
  // }
  const setSearchPlaceHolderNote = () => {
    let mesage = "";
    if (categoryId) {
      if (lang.toUpperCase() == "VI") {
        mesage = `Tìm kiếm trong '${categoryName}'`;
      } else {
        mesage = `Search in '${categoryName}'`;
      }
    } else {
      if (lang.toUpperCase() == "VI") {
        mesage = `Tìm kiếm toàn bộ sản phẩm`;
      } else {
        mesage = `Search all products`;
      }
    }
    return mesage;
  };

  // const onChangePagination = async (current: number, pageSize: number) => {
  //   pagination.page = current
  //   pagination.size = pageSize
  //   setPagination(pagination)
  //   getProducts(categoryId, lang, current, pageSize, productName)
  // }
  const handleInputClick = (e: any) => {
    e.stopPropagation();
  };
  // const searchProduct = async (value: any) => {
  //   setProductName(value)
  //   getProducts(categoryId, lang, 1, pagination.size, value)
  // };
  console.log(categoryName, "categoryName");
  return (
    <div className="list-products-right">
      <div className="list-products-right-title">
        {title ? title : `${t.list_products.TITLE1}`}
      </div>
      <div className="list-products-right-title-sub">
        {t.list_products.TITLE2} {pagination.totalRecords} sản phẩm
      </div>
      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
        <Search
          placeholder={setSearchPlaceHolderNote()}
          onSearch={value => searchProduct(value)}
          style={{ width: 200 }}
        />
        <span style={{ margin: '20px', fontSize: '14px' }}>
          {setSearchPlaceHolderNote()}
        </span>
      </div> */}
      <div>
        {products?.length > 0 ? (
          <>
            <div className="list-products-right-wrap">
              {products.map((data: any, index: number) => (
                <div className="list-products-right-wrap-item" key={index}>
                  <CardProduct props={data} />
                </div>
              ))}
            </div>
            <Pagination
              style={{ flex: "alignItems" }}
              total={pagination?.totalRecords ? pagination?.totalRecords : 10}
              defaultCurrent={1}
              current={pagination?.page ? pagination?.page : 1}
              pageSize={pagination?.size ? pagination?.size : 10}
              pageSizeOptions={PAGE_SIZE}
              // showSizeChanger
              // onChange={onChangePagination}
              // onShowSizeChange={onChangePagination}
              className="list-news-pagination"
            />
          </>
        ) : (
          <div style={{ flex: "alignItems" }}>
            <Image
              src="/images/noproducts.png"
              alt="Thuong thuong handmade"
              width={1019}
              height={400}
              className="list-products-empty"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default ListProducts;
