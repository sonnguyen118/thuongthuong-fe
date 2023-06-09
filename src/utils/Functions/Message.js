import { toast } from "react-toastify";


function successNotify (str,action) {
  toast.success(str, {
    position: 'top-right',
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
};

function errorNotify (str) {
  toast.error(str, {
    position: 'top-right',
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  })
};


export default { successNotify, errorNotify };

