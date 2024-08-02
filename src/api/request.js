import axios from 'axios'

// 请求地址
axios.defaults.baseURL = ''
// 请求超时时间
axios.defaults.timeout = 20000 * 180
// 设置post的请求头
axios.defaults.headers.common['Content-Type'] = '*/*;charset=UTF-8'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// 请求拦截
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.error(error)
    }
)
// 响应拦截
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    // 根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    error => {
        if (error.response.status) {
            return Promise.reject(error.response)
        }
    }
)

// get方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {params: params})
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

// post方法
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

// delete方法
export function del(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .delete(url, {params: params})
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

// put方法
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .put(url, {params: params})
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
