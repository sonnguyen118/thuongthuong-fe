import request from "../RequestGlobalConfig";

type language = {
    VI : string;
    EN : string;
    FR : string;
    PO : string;
}
type bodyCategory = {
    name: language;
    link: string;
    parent: string | number
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
};

export default Category;
