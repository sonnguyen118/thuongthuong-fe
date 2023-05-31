import request from "../RequestGlobalConfig";
import {axiosInstanceAuthorization, axiosInstanceClient}  from "../AxiosInterceptor"

type NameState = {
  [key: string]: string | undefined;
};
type bodyCategory = {
    name: NameState;
    link: string;
    parent: string | number
};

type bodyCategoryGetAdmin = {
  language: string;
};

const Category = {
  create: {
    post: function (path: string, data: bodyCategory) {

      return request({
        method: "POST",
        url: process.env.NEXT_PUBLIC_API_URL + path,
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      });
    },
  },
  getAllAdmin: {
    get: function (path: string, data: bodyCategoryGetAdmin) {
      return request({
        method: "GET",
        url: process.env.NEXT_PUBLIC_API_URL + path,
        data: data,
        headers: {
          "Content-type": "application/json",
        },
      });
    },
  },
};

export default Category;
