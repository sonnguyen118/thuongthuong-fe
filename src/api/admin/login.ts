import { AuthorizeLogin } from "@repository/admin";

type bodyLogin = {
  username: string;
  password: string;
};

const loginAuthorize = (body?: any): Promise<any> => {
  return AuthorizeLogin.defaultReader.post("/auth/login", body);
};

export default { loginAuthorize };
