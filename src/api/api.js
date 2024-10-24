import axios from 'axios'

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
  getMachineInfo() {
    return ajax('machine_info', 'GET')
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
      axios({
        url,
        method,
        params: data
      }).then(res => {
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      data
    }).then(res => {
      resolve(res.data.data)
    }).catch(err => {
      reject(err)
    })
  })
}
