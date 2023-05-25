import React, { useState, useEffect, useRef } from "react";
import { Spin } from "antd";

const Ckeditor: React.FC<{ data: string }> = ({ data }) => {
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
    toolbar: null, // ẩn thanh công cụ
  };
  return (
    <div>
      {editorLoaded && data ? (
        <div className="ckeditor__show">
          <editorRef.current.CKEditor
            editor={editorRef.current.ClassicEditor}
            config={editorConfig}
            data={data}
            disabled={true}
          />
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Ckeditor;
