import request from "../RequestGlobalConfig";

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
const Products = {
  create: {
    post: function (path: string, data: bodyProducts, token: string) {
      return request({
        method: "POST",
        url: process.env.NEXT_PUBLIC_API_URL + path,
        data: data,
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
    },
  },
  getAll: {
    post: function (path: string, data: bodyProductsGetAll, token: string) {
      return request({
        method: "POST",
        url: process.env.NEXT_PUBLIC_API_URL + path,
        data: data,
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
    },
  }
};

export default Products;
