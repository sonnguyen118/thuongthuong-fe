import React, { useState, useEffect, useRef } from "react";
import { Spin } from "antd";
import {handleCKEditor} from "@service"
import { useCookies } from "react-cookie";

type Props = {
  data: string | undefined; // cho phép `data` có thể là `undefined`
  setData: React.Dispatch<React.SetStateAction<string | undefined>>; // cho phép giá trị mới có thể là `undefined`
};

const Ckeditor  = ({data, setData} : Props) => {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies["accessToken"];
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

  const handleEditorChange = (event: any, editor: any) => {
    const newData = editor.getData();
    setData(newData);
  };
  function uploadPlugin(editor:any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader:any) => {
      return handleCKEditor.uploadAdapter(loader);
    };
  }
  return (
    <>
      {editorLoaded ? (
        <>
          <editorRef.current.CKEditor
            editor={editorRef.current.ClassicEditor}
            onChange={handleEditorChange}
            config={{
              extraPlugins: [uploadPlugin]
            }}
          />
        </>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default Ckeditor;
