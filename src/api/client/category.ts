import { Category } from "@repository/client";




const getAllCategory = (param :string ): Promise<any> => {
  return Category.getAll.get("/category", param);
};

export default { getAllCategory };
