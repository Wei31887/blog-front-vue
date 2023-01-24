import request from "@/utils/request"

export function GetBlogger(data) {
    return request({
        url: '/blogger',
        method: 'post',
        data
    })
} 