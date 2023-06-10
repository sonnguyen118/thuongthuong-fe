import { Diacritic } from '@utils/Functions'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const UPLOAD_ENDPOINT = 'product/admin/upload'
const uploadAdapter = (loader: any) => {
  return {
    upload: () => {
      return new Promise((resolve: any, reject: any) => {
        loader.file.then((file: any) => {
          const body = new FormData()
          console.log('test file')
          console.log(file)
          const fileName = (Date.now() +
            '-' +
            Diacritic.convertValueWithDashes(file.name)) as string
          console.log(fileName)
          body.append('upload', file)
          // let headers = new Headers();
          // headers.append("Origin", "http://localhost:3000");
          fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
            method: 'post',
            body: body
            // mode: "no-cors"
          })
            .then(res => {
              return res.json()
            })
            .then(res => {
              resolve({
                default: `${API_URL}/${res.path}`
              })
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      })
    }
  }
}

export default { uploadAdapter }
