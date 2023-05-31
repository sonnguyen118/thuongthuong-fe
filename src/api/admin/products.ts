import { Products } from "@repository/admin";


interface contentProps {
    name: string,
    language: string,
    content: string,
    description: string
}

interface bodyProducts {
    link: string,
    imgLink: string,
    categoryId: number,
    content: contentProps[]
}
interface bodyProductsGetAll {
  language: string;
  page: number;
  size: number
}

const createProducts = (body: bodyProducts, token: string): Promise<any> => {
  return Products.create.post("/product/admin/create", body, token);
};

const getAllProducts = (body: bodyProductsGetAll, token: string): Promise<any> => {
  return Products.getAll.post("/product/admin/get-products", body, token);
};




export default { createProducts, getAllProducts };
