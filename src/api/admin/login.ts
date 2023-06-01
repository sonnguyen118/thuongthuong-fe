import {axiosInstanceAuthorization, axiosInstanceClient} from "@api/AxiosInterceptor";

type bodyLogin = {
  username: string;
  password: string;
};

const loginAuthorize = (body: any): Promise<any> => {
  return axiosInstanceClient.post(process.env.NEXT_PUBLIC_API_URL + "/auth/login", body);
};

export default { loginAuthorize };
