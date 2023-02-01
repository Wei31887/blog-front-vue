import { createStore } from 'vuex'
import { BlogType } from '@/api/blog'
import { GetBlogger } from '@/api/blogger'


export default createStore({
  state: {
    TypeIdMap: {},
    IdTypeMap: {},
    bloggerInfo: {},
  },
  getters: {
    getTypeIdMap(state) {
      return state.TypeIdMap
    }, 
    getIdTypeMap(state) {
      return state.IdTypeMap
    }, 
    getBlogger(state) {
      return state.bloggerInfo
    }
  },
  mutations: {
    SET_TYPEID(state, TypeIds) {
      state.TypeIdMap = TypeIds
    },
    SET_IDTYPE(state, IdType) {
      state.IdTypeMap = IdType
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
              let typeIdMap = {}
              let IdTypeMap = {}
              res.data.data.forEach( item => {
                typeIdMap[item.b_name] = item.type_id
                IdTypeMap[item.type_id] = item.b_name
              });
              commit('SET_TYPEID', typeIdMap)
              commit('SET_IDTYPE', IdTypeMap)
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
