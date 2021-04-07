import axios from 'axios'
import qs from 'qs'
const instance = axios.create()
instance.interceptors.request.use(
    config => 
    {
        if (localStorage.getItem('Authorization')) {
            config.headers.token = localStorage.getItem('Authorization')
        }
        return config;
    },
    err => {
        return Promise.reject(err)
    }
)
instance.interceptors.response.use(
    response => {
        return Promise.resolve(response.data);
    },
    err => {
        return Promise.reject(err)
    }
)
export default instance
export function newVideo (data) {
    return axios({
      method: 'post',
      url: '/movie/upload',
      data: data,
      headers: {
          
          "token": localStorage.getItem('Authorization')
      }
    })   
  }