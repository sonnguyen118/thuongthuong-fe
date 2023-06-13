import { Diacritic } from '@utils/Functions'
import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface ImageUploadProps {
  linkUpload: string
  data: any
  initImg?: string
}
const URL = `${process.env.NEXT_PUBLIC_API_URL}`
const ImageUpload: React.FC<ImageUploadProps> = props => {
  const { linkUpload, data } = props
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    // setErrorMessage('')
    setFileList(newFileList)
  }
  useEffect(() => {
    if (props?.data?.imageUrl) {
      const initialFileList: UploadFile[] = [
        {
          uid: '-1',
          name: 'image.jpg',
          status: 'done',
          url: `${process.env.NEXT_PUBLIC_API_URL}/${props.data.imageUrl}`
        }
      ]
      setFileList(initialFileList)
    }
  }, [props?.data])

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const customUploadRequest = async (options: any) => {
    const { onSuccess, onError, file } = options
    try {
      const body = new FormData()
      body.append(
        'file',
        file,
        Diacritic.convertValueWithDashes(file.name) as string
      )
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${linkUpload}`,
        body
      )
      props.data.imageUrl = `${response.data.path}`
      setErrorMessage('')
      onSuccess(response.data, file)
    } catch (error: any) {
      // Xử lý lỗi nếu có
      setErrorMessage('Tải ảnh thất bại: ' + error?.response?.data?.message)
      onError(error)
    }
  }

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          customRequest={customUploadRequest}
          listType='picture-card'
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
      {errorMessage !== '' && (
        <span style={{ color: 'red' }}>{errorMessage}</span>
      )}
    </>
  )
}

export default ImageUpload
