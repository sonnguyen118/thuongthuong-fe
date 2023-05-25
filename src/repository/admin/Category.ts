import request from "../RequestGlobalConfig";

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
    post: function (path: string, data: bodyCategory, token: string) {
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
  getAllAdmin: {
    get: function (path: string, data: bodyCategoryGetAdmin, token: string) {
      return request({
        method: "GET",
        url: process.env.NEXT_PUBLIC_API_URL + path,
        data: data,
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
    },
  },
};

export default Category;
