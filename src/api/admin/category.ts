import {axiosInstanceAuthorization, axiosInstanceClient}  from "@repository/AxiosInterceptor";
import * as process from "process";

type NameState = {
  [key: string]: string | undefined;
};

type bodyCategory = {
    name: NameState;
    link: string;
    parent: string | number
};

type bodyGetAllCategoryprops = {
  language: string;
}

const createCategory = (body: bodyCategory): Promise<any> => {
  return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL+ "/category/create", body);
};


const getAllCategory = (bodyGetAllCategory: bodyGetAllCategoryprops): Promise<any> => {
  return axiosInstanceAuthorization.get(  process.env.NEXT_PUBLIC_API_URL + "/category/admin-get-all");
};

export default { createCategory, getAllCategory };
