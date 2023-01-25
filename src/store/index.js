import { createStore } from 'vuex'
import { BlogType } from '@/api/blog'
import { GetBlogger } from '@/api/blogger'


export default createStore({
  state: {
    blogTypeList: {},
    bloggerInfo: {},
  },
  getters: {
    getBlogTypes(state) {
      return state.blogTypeList
    }, 
    getBlogger(state) {
      return state.bloggerInfo
    }
  },
  mutations: {
    SET_TYPE(state, blogTypes) {
      state.blogTypeList = blogTypes
    },
    SET_BLOGGER(state, blogger) {
      state.bloggerInfo = blogger
    }
  },
  actions: {
    loadingBlogType({commit}) {
      return new Promise((resolve, reject) => {
          BlogType().then(res => {
            if (res.data.code === 0) {
              let temp = {}
              res.data.data.forEach( item => {
                temp[item.b_name] = item.type_id
              });
              commit('SET_TYPE', temp)
              resolve(res)
            } else {
              reject(res)
            }
          }).catch(e => { console.log(e) })
        }
      )
    },
    
    loadingBlogger({commit}) {
      return new Promise((resolve, reject) => {
        GetBlogger().then(res => {
            if (res.data.code === 0) {
              commit('SET_BLOGGER', res.data.data)
              resolve(res)
            } else {
              reject(res)
            }
          }).catch(e => { console.log(e) })
        }
      )
    }
  },
  modules: {

  }
})
