import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
})

export const BASE_URL = import.meta.env.VITE_APP_API_URL
export default {
  getDownloadLink(id, file_name) {
    return `${BASE_URL}stitched_image/download/${id}/${file_name}`
  },
  getDataList(params) {
    return ajax('data', 'GET', params)
  },
  requestStitch(fileName, step) {
    return ajax('stitch', 'POST', { id: fileName, step: step })
  },
  getStitchedImage(fileName, step) {
    return axiosInstance.get(`/stitched_image/${fileName}/${step}`)
  },
  getServerInfo() {
    return ajax('server_info', 'GET')
  },
  postServerInfo(data) {
    return ajax('server_info', 'POST', data)
  },
  getErrorLog(fileName, step) {
    return axiosInstance.get(`/error_log/${fileName}/${step}`)
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
  deleteFile(fileName) {
    return ajax(`delete/${fileName}`, 'DELETE')
  },
  getImageDownloadLinks(fileName) {
    return axiosInstance.get(`/stitched_image/${fileName}/1`)
  },
  resetFile(fileName) {
    return axiosInstance.post(`/reset/${fileName}`)
  }
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
