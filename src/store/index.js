import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// todoLists :
// id  // 唯一 ID, 由创建时间的 unix 组成
// stampUnix: '', // 时间戳
// color: '', // 颜色
// name: '', // 颜色名称
// secondaryColor: '', // 外圈颜色
// content: '' // 内容
// status: '' // true false
const state = () => ({
  selectedDayUnix: null, // 选中日期毫秒
  todoLists: [], // 待办事项
  // 主题颜色集
  themeColors: {
    blue: '#3b82f6',
    emerald: '#10b981',
    orange: '#f97316',
    rose: '#ef4444'
  },
  themeColor: 'blue' // 主题颜色
})

const getters = {
  // 根据日期毫秒，获取当天所有待办
  getTodayTodoLists(state) {
    return stampUnix =>
      state.todoLists.filter(item => item.stampUnix == stampUnix)
  },

  // 获取主题颜色对应的颜色代码
  getThemeColorCode(state) {
    return state.themeColors[state.themeColor]
  }
}

const mutations = {
  // 更新选择日期
  updateSelectedDayUnix(state, newVal) {
    state.selectedDayUnix = newVal
  },

  // 更新待办状态
  updateTodoListStatus(state, id) {
    const list = state.todoLists.find(item => item.id == id)
    list.status = !list.status
  },
  // 新建待办
  createTodoList(state, list) {
    state.todoLists.push(list)
  },
  // 修改待办
  updateTodoList(state, newList) {
    let index = state.todoLists.findIndex(item => item.id == newList.id)
    state.todoLists.splice(index, 1, newList)
  },
  // 删除待办
  deleteTodoList(state, id) {
    const index = state.todoLists.findIndex(item => item.id == id)
    state.todoLists.splice(index, 1)
  },

  // 修改主题颜色
  changeThemeColor(state, color) {
    state.themeColor = color
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions: {}
})
