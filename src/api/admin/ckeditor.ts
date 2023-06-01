import {axiosInstanceAuthorization} from "@api/AxiosInterceptor";


const ckeditorUploadImages = (file: any): Promise<any> => {
  return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL +"/product/admin/upload ", file);
};

export default { ckeditorUploadImages };
