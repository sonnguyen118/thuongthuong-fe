import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";

const Home: React.FC = () => {
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
  const [data, setData] = useState(
    `<figure class="media"><oembed url="https://www.youtube.com/watch?v=O36r05htZXU"></oembed></figure>`
  );

  const handleEditorChange = (event: any, editor: any) => {
    const newData = editor.getData();
    setData(newData);
  };
  console.log(data, "data");
  return (
    <div>
      <Head>
        <title>Ckeditor 5</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Ckeditor5 Nextjs</h1>
      {editorLoaded &&
      editorRef.current.CKEditor &&
      editorRef.current.ClassicEditor ? (
        <>
          <editorRef.current.CKEditor
            editor={editorRef.current.ClassicEditor}
            onChange={handleEditorChange}
          />
          <div className="ckeditor__show">
            <editorRef.current.CKEditor
              editor={editorRef.current.ClassicEditor}
              config={editorConfig}
              data={data}
              disabled={true}
            />
          </div>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default Home;
