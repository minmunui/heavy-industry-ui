import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
})
console.log(`API URL: ${import.meta.env.VITE_APP_API_URL}`)

export default {
  getDataList(params) {
    return ajax('data', 'GET', params)
  },
  requestStitch(fileName, step) {
    return ajax('stitch', 'POST', { id: fileName, step: step })
  },
  getStitchedImage(fileName, step) {
    return ajax('stitched_image', 'GET', { fileName, step })
  },
  getServerInfo() {
    return ajax('server_info', 'GET')
  },
  postServerInfo(data) {
    console.log(`POST server_info with data:`, data)
    return ajax('server_info', 'POST', data)
  },
  getErrorLog(fileName, step) {
    return ajax('error_log', 'GET', { fileName, step })
  },
  uploadSingleFile(uploadId, formData) {
    return axiosInstance.post(`/single_upload/${uploadId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  uploadMultipleFiles(uploadId, formData) {
    return axiosInstance.post(`/multiple_upload/${uploadId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
}

function ajax(url, method, data) {
  for (let key in data) {
    if (
      data[key] === null ||
      data[key] === undefined ||
      data[key] === '' ||
      (Array.isArray(data[key]) && data[key].length === 0) ||
      (typeof data[key] === 'object' && !Array.isArray(data[key]) && Object.keys(data[key]).length === 0)
    ) {
      delete data[key]
    }
  }
  if (method === 'GET') {
    return new Promise((resolve, reject) => {
      axiosInstance({
        url,
        method,
        params: data
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // if (method === 'POST') {
  //   console.log(`POST ${url} with data:`, data)
  //   return new Promise((resolve, reject) => {
  //     axiosInstance.post(url, data)
  //       .then(res => {
  //         resolve(res.data)
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // }
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method,
      data
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
