import React, { useState, useEffect, useRef } from 'react'
import { Spin } from 'antd'

const Ckeditor: React.FC = () => {
  const editorRef = useRef<{ CKEditor: any; ClassicEditor: any }>({
    CKEditor: null,
    ClassicEditor: null
  })
  const [editorLoaded, setEditorLoaded] = useState(false)

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('ckeditor5-custom-build/build/ckeditor')
    }
    setEditorLoaded(true)
  }, [])
  const yourToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNzk0MDZiMTEtZjk4My00MThiLWExZWEtZTE5YzFiZDFlZmMxIiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY4NTIwNDIxNn0.Gbdn6MDz-7uYxooowo3apnr0BnKzc8khBDO6vxu8ttA'
  const editorConfig = {
    ckfinder: {
      uploadUrl: 'http://localhost:3001/api/product/admin/upload',
      headers: {
        Authorization: `Bearer ${yourToken}`
      }
    },
    uploadFailed: function (event: any) {
      console.log(event)
    },
    uploadSuccess: (response: any) => {
      const imageUrl = response.data.default.url // lấy đường dẫn ảnh từ response
      const editor = response.sender
      editor.model.change((writer: any) => {
        const imageElement = writer.createElement('image', {
          src: imageUrl
        })
        editor.model.insertContent(
          imageElement,
          editor.model.document.selection
        )
      })
    }
  }
  const [data, setData] = useState(null)

  const handleEditorChange = (event: any, editor: any) => {
    const newData = editor.getData()
    setData(newData)
    console.log('abc')
  }
  console.log(data, 'data')
  return (
    <>
      {editorLoaded ? (
        <>
          <editorRef.current.CKEditor
            editor={editorRef.current.ClassicEditor}
            onChange={handleEditorChange}
            config={editorConfig}
          />
        </>
      ) : (
        <Spin />
      )}
    </>
  )
}

export default Ckeditor
