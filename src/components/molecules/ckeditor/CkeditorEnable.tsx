import React, { useState, useEffect, useRef } from "react";
import { Spin } from "antd";

const Ckeditor: React.FC = () => {
  const editorRef = useRef<{ CKEditor: any; ClassicEditor: any }>({
    CKEditor: null,
    ClassicEditor: null,
  });
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("ckeditor5-custom-build/build/ckeditor"),
    };
    setEditorLoaded(true);
  }, []);
  const editorConfig = {
    height: "500px", // ẩn thanh công cụ
  };
  const [data, setData] = useState(null);

  const handleEditorChange = (event: any, editor: any) => {
    const newData = editor.getData();
    setData(newData);
  };
  console.log(data, "data");
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
  );
};

export default Ckeditor;
