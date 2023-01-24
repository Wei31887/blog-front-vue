import axios from "axios"
import { ElMessage } from 'element-plus'
import { BASE_API } from "@/config/config";

const service = axios.create({
    baseURL: BASE_API,
    timeout: 10000
})

// axios request 攔截器
service.interceptors.request.use(
    config => {
        return config
    },
    err => {
        console.log(err)
        return Promise.reject(err)
    }
)

// axios 攔截器： response前狀態
service.interceptors.response.use(
    response => {
        let res = response.data
        if (res.code == 0) {
            return response
        } else {
            ElMessage({
                message: res.msg,
                type: 'error',
            })
            return Promise.reject(response)
        }
    },
    error => {
        console.log('err: ' + error);
        ElMessage({
            message: error.response.status + ', ' + error.response.data.msg,
            type: 'error',
        })
        return Promise.reject(error)
    }
)

export default service