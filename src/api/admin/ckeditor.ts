import { CKEditor } from "@repository/admin";


const ckeditorUploadImages = (file: any, token: string): Promise<any> => {
  console.log(file, "file")
  return CKEditor.upload.post("/product/admin/upload", file, token);
};





export default { ckeditorUploadImages };
