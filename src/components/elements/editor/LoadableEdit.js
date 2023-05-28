import React, { useState } from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

const LoadableEdit = Loadable({
  loader: () => import('./TextEditor'),
  loading: Loading,
});

export const FormPage = (props) => {
  const [editor, setEditor] = useState(null);
  return (
    <div>
      <LoadableEdit
        handleChange={(data) => {
          setEditor(data);
        }}
        data={editor}
        {...props}
      />
    </div>
  );
};
export default FormPage;
