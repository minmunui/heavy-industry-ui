import axios from 'axios'

export default {
  getDataList(params) {
    return ajax('data', 'GET', params)
  },
  stitch1(fileName) {
    return ajax('stitch_step_1', 'POST', { fileName })
  },
  stitch2(fileName) {
    return ajax('stitch_step_2', 'POST', { fileName })
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
