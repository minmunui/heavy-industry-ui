import axios from 'axios'

export default {
  getDataList() {
    return ajax('data', 'GET')
  }
}

function ajax(url, method, data) {
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
