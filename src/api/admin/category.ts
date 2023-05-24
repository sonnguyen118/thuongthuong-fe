import { Category } from "@repository/admin";

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

const createCategory = (body: bodyCategory, token: string): Promise<any> => {
  return Category.create.post("/category/create", body, token);
};


const getAllCategory = (bodyGetAllCategory :bodyGetAllCategoryprops, token: string): Promise<any> => {
  return Category.getAllAdmin.get("/category/admin-get-all", bodyGetAllCategory, token);
};

export default { createCategory, getAllCategory };
