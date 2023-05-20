import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { store } from "@store";
import viText from "@languages/vie.json";
import loadLanguageText from "@languages";
const { TextArea } = Input;

const FormContactHome: React.FC = () => {
  const [t, setText] = useState(viText);
  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  );
  useEffect(() => {
    loadLanguageText(lang, setText);
  }, [lang]);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Form
        name="contactForm"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        layout="vertical"
        className="home__contact-wrap-right-form"
      >
        <Form.Item
          name="name"
          label={t.label.LABEL1}
          className="home__contact-wrap-right-form"
          rules={[{ required: true, message: `${t.notical.TITLE3}` }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="email"
          label={t.label.LABEL2}
          rules={[
            {
              type: "email",
              message: `${t.notical.TITLE4}`,
            },
            {
              required: true,
              message: `${t.notical.TITLE5}`,
            },
          ]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={t.label.LABEL3}
          rules={[
            {
              required: true,
              message: `${t.notical.TITLE7}`,
            },
          ]}
        >
          <Input prefix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item name="message" label={t.label.LABEL4}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t.button.BUTTON6}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormContactHome;
