import {axiosInstanceAuthorization, axiosInstanceClient} from "@api/AxiosInterceptor";




const getAllCategory = ( ): Promise<any> => {
  return axiosInstanceClient.get(process.env.NEXT_PUBLIC_API_URL+ "/category");
};

export default { getAllCategory };
