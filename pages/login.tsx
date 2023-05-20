import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Image from "next/image";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Login } from "@service";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
interface PageSEOData {
  name: string;
  pageSEO: {
    title: string;
    url: string;
    keywords: string[];
    description: string;
    image: string;
  };
}

const LoginPages = () => {
  const [accessToken, setAccessToken] = useCookies(["accessToken"]);
  const [refreshToken, setRefreshToken] = useCookies(["refreshToken"]);

  const router = useRouter();
  const onFinish = (values: any) => {
    Login.handleLogin({
      username: values.username,
      password: values.password,
    })
      .then((response: any) => {
        console.log(response, "Success");
        const { data, meta } = response;
        setAccessToken("accessToken", data.accessToken);
        setRefreshToken("refreshToken", data.refreshToken);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${meta.message}`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push("/admin");
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-wrap">
      <div className="login">
        <div className="login-logo">
          <Image
            src="/icon/logo.png"
            alt="thuongthuong"
            width={100}
            height={90}
            className="login-logo-img"
          />
          <h3 className="login-logo-title">
            HỆ THỐNG QUẢN TRỊ <br></br> WEBSITE THƯƠNG THƯƠNG
          </h3>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản !!!" },
            ]}
            className="login-form-item"
          >
            <Input
              className="login-form-item-input"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu !!!" }]}
            className="login-form-item"
          >
            <Input.Password
              className="login-form-item-input"
              prefix={<KeyOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
            className="login-form-item"
          >
            <Checkbox className="login-form-item-checkbox">
              Lưu tài khoản
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            className="login-form-item"
          >
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-item-submit"
            >
              ĐĂNG NHẬP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPages;
