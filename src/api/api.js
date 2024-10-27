import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});
console.log(`API URL: ${import.meta.env.VITE_APP_API_URL}`);

export default {
  getDataList(params) {
    return ajax('data', 'GET', params)
  },
  requestStitch(fileName, step) {
    return ajax('stitch', 'POST', { fileName, step })
  },
  getStitchedImage(fileName, step) {
    return ajax('stitched_image', 'GET', { fileName, step })
  },
  getServerInfo() {
    return ajax('server_info', 'GET')
  },
  postServerInfo(data) {
    return ajax('server_info', 'POST', data)
  },
  getErrorLog(fileName, step) {
    return ajax('error_log', 'GET', {fileName, step})
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
      delete data[key];
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
