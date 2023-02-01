import request from "@/utils/request"

export function BlogList(data) {
    return request({
        url: '/blog/list',
        method: 'post',
        data
    })
} 

export function BlogContent(data) {
    return request({
        url: '/blog/content',
        method: 'post',
        data
    })
} 

export function BlogComment(data) {
    return request({
        url: '/blog/comment',
        method: 'post',
        data
    })
} 

export function BlogType() {
    return request({
        url: '/blog/type',
        method: 'post',
    })
} 

export function BlogTagList() {
    return request({
        url: '/tag/list',
        method: 'post',
    })
} 

export function BlogListWithTag(data) {
    return request({
        url: '/tag/blog',
        method: 'post',
        data
    })
} 