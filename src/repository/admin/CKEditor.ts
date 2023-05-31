import request from "../RequestGlobalConfig";


const CKEditor = {
  upload: {
    post: function (path: string, file: any, token: string) {
      const body = new FormData();
      body.append("upload", file);
      return request({
        method: "POST",
        url: process.env.NEXT_PUBLIC_API_URL + path,
        data: body,
        headers: {
          "Content-type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
      }).catch((error) => {
        console.log(error,"error");
        throw error;
      });
    },
  },
};

export default CKEditor;
