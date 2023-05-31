import { StringGradients } from "antd/es/progress/progress";
import request from "../RequestGlobalConfig";


const Category = {
  getAll: {
    get: function (path: string, param: StringGradients) {
      return request({
        method: "GET",
        url: process.env.NEXT_PUBLIC_API_URL + path + "?" + param,
        headers: {
          "Content-type": "application/json",
        },
      });
    },
  },
};

export default Category;
