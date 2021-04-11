import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import qs from 'querystring'

const state = {
  userId: '',
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  nikeName: '用户名称',
  userPic: '',
  layout: null
}

const mutations = {

  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ID: (state, msg) => {
    state.userId = msg
  },
  SET_LAYOUT: (state, data) => {
    state.layout = data
  },
  SET_NICKNAME: (state, data) => {
    state.nikeName = data
  },
  SET_USERPIC: (state, data) => {
    state.userPic = data
  }

}

const actions = {
  // login/login.vue 执行逻辑
  login({ commit }, userInfo) {
    console.log(userInfo)
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 将json 字符串转化为x-from
      const user = qs.stringify({ userName: username.trim(), password: password })
      login(user).then((res) => {
        const { code, token } = res

        if (code == '200') {
          // 储存token 到vuex
          commit('SET_TOKEN', token)
          //  储存token 到 cookie
          setToken(token)
          resolve(token)
        } else {
          this.$message('登录失败，请检查账号密码是否错误')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then((res) => {
        const { userInfo } = res

        console.log('获取到的用户信息', userInfo)

        commit('SET_USER', userInfo)

        const userRole = ['admin']

        commit('SET_ROLES', userRole)

        resolve(userRole)
      }).catch(error => {
        removeToken()
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },
  setLayout({ commit }, layout) {
    commit('SET_LAYOUT', layout)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
