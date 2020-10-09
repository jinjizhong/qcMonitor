import axios from 'axios'
// import store from '../store'

function initAxios () {
  //初始化配置
  //设置api访问基路径
  axios.defaults.baseURL = ''  // ’/api‘
  // axios.defaults.headers.common['tokenStr'] = store.state.tokenStr //这里使用了Vuex中的常量（需要先引入store）
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  // axios.defaults.withCredentials = true
}
/* 封装axios http网络请求 */
export function axiosHttp (url = '', data = {}, type = 'POST') {
  // 返回值 Promise对象 （异步返回的数据是response.data，而不是response）
  return new Promise(function (resolve, reject) {
    initAxios()
    // （利用axios）异步执行ajax请求
    let promise // 这个内部的promise用来保存axios的返回值(promise对象)
    if (type === 'GET') {
      // 准备 url query 参数数据
      let dataStr = '' // 数据拼接字符串，将data连接到url
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        // 把最后的&去掉，拼成完整的url
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url)
    } else {
      // 发送 post 请求
      // console.log(data, 'datadata')
      promise = axios.post(url, jsToFormData(data))
    }
    promise.then(response => {
      // 成功回调resolve()
      //console.log('成功===?>',JSON.stringify(response))
      if (url.indexOf('curuserid') > -1) {
        resolve(response.data)
      } else {
        resolve(response.data.data)
      }
    }).catch(error => {
      // 失败回调reject()
      reject(error)
    })
  })
}

//对象对象转formdata格式
function jsToFormData (config) {
  let formData = new FormData()
  let obj = config
  let arrayKey = config.arrayKey || false
  for (var i in obj) {
    if (Array.isArray(obj[i])) {
      obj[i].map(item => {
        if (!arrayKey) {
          formData.append(i, item)
        } else {
          formData.append(i + '[]', item)
        }
      })
    } else if (obj[i] instanceof FileList) {
      //filelist 文件类型的处理
      for (var fileItem = 0; fileItem < obj[i].length; fileItem++) {
        if (!arrayKey) {
          formData.append(i, obj[i].item(fileItem))
        } else {
          formData.append(i + '[]', obj[i].item(fileItem))
        }
      }
    } else {
      formData.append(i, obj[i])
    }
  }
  return formData
}

export default {
  axiosHttp
}
