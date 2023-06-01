import {Ckeditor} from "@api";

const  uploadAdapter= (loader : any, token : string)=> {
  return {
    upload: () => {
      return new Promise((resolve:any, reject:any) => {
        loader.file.then((file:any) => {
         const response =  Ckeditor.ckeditorUploadImages(file)
            .then((res) => {
              if(res.status === 201) {
                console.log(response,"response")
                console.log(res,"res")
                resolve({
                  default: `${process.env.NEXT_PUBLIC_API_URL}/${res.data.path}`
                });
              } else {
                console.log("Tải ảnh thất bại")
              }
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      });
    }
  };
}



export default { uploadAdapter };
