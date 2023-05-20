import request from "../RequestGlobalConfig";

const AuthorizeLogin = {
  defaultReader: {
    post: function (path: string, data?: any) {
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
};

export default AuthorizeLogin;
