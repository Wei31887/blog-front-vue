import { createStore } from 'vuex'
import { BlogType } from '@/api/blog'

export default createStore({
  state: {
    blogTypeList: {},
  },
  getters: {
    getBlogTypes(state) {
      return state.blogTypeList
    }
  },
  mutations: {
    SET_TYPE(state, blogTypes) {
      state.blogTypeList = blogTypes
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
          }).catch(e => {
            console.log(e)
          })
        }
      )
    }

  },
  modules: {

  }
})
