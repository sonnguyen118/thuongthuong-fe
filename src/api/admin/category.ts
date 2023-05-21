import { Category } from "@repository/admin";

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

const createCategory = (body: bodyCategory, token: string): Promise<any> => {
  return Category.create.post("/category/create", body, token);
};

export default { createCategory };
