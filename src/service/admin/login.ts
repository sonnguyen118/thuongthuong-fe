import { Login } from "@api";

type bodyLogin = {
  username: string;
  password: string;
};

type metaProps = {
  message: string;
  status: number;
};

type ResponseData = {
  data: any;
  meta: metaProps;
};

const handleLogin = async (body: bodyLogin): Promise<ResponseData | Error> => {
  try {
    const response = await Login.loginAuthorize(body);
    const { data, meta } = response.data;
    if (meta.status === 200) {
      const resData: ResponseData = { meta: meta, data: data };
      return resData;
    } else {
      throw new Error(`Unexpected status code: ${meta.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      return new Error("Unexpected error");
    }
  }
};

export default { handleLogin };
