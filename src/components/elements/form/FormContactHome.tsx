import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { store } from '@store'
import viText from '@languages/vie.json'
import loadLanguageText from '@languages'
import axios from 'axios'
import { Message } from '@utils/Functions'
const { TextArea } = Input

interface ContactDto {
  name: string
  phone: string
  email: string
  description: string
}
const FormContactHome: React.FC = () => {
  const [t, setText] = useState(viText)
  const [contactForm] = Form.useForm()

  const lang = useSelector(
    (state: ReturnType<typeof store.getState>) => state.language.currentLanguage
  )
  useEffect(() => {
    loadLanguageText(lang, setText)
  }, [lang])
  const onFinish = async (values: ContactDto) => {
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, values)
        .then(e => {
          Message.successNotify('Tạo liên hệ thành công')
          console.log('contactForm', contactForm.getFieldsValue())
          contactForm.resetFields()
        })
    } catch (error: any) {
      Message.errorNotify(error.response.data.message)
    }

    // console.log('Received values of form: ', formRef.current?.description)
  }
  const onReset = () => {
    contactForm.resetFields()
  }
  const handleSubmit = () => {}
  return (
    <>
      {/*<Button htmlType='button' onClick={onReset}>*/}
      {/*  Reset*/}
      {/*</Button>*/}
      <Form
        name='contactForm'
        form={contactForm}
        onFinish={onFinish}
        initialValues={{ remember: true }}
        layout='vertical'
        className='home__contact-wrap-right-form'
      >
        <Form.Item
          name='name'
          label={t.label.LABEL1}
          className='home__contact-wrap-right-form'
          rules={[{ required: true, message: `${t.notical.TITLE3}` }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name='email'
          label={t.label.LABEL2}
          rules={[
            {
              type: 'email',
              message: `${t.notical.TITLE4}`
            },
            {
              required: true,
              message: `${t.notical.TITLE5}`
            }
          ]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          name='phone'
          label={t.label.LABEL3}
          rules={[
            {
              required: true,
              message: `${t.notical.TITLE7}`
            }
          ]}
        >
          <Input prefix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item name='message' label={t.label.LABEL4}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {t.button.BUTTON6}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default FormContactHome
