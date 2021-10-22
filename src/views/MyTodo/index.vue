<template>
  <div class="my-todo-container">
    <!-- 头部搜索框 -->
    <header1 />

    <!-- 标题 + 新建按钮 -->
    <div class="top">
      <p class="title">我的待办</p>
      <div class="button-box">
        <button class="back" @click="backToToday">
          <svg-icon icon-class="repeat"></svg-icon>
          回到今天
        </button>
        <button
          class="new"
          @click="openNewPopup"
          :style="{ backgroundColor: themeColorCode }"
        >
          新建待办
        </button>
      </div>
    </div>

    <!-- 日历 -->
    <div class="calender-container">
      <calender ref="calender"></calender>
    </div>

    <!-- 待办显示区域 -->
    <div class="todo-content">
      <div v-if="todayTodoLists.length" class="today-todo-lists">
        <div
          class="today-todo-list"
          :class="{ completed: list.status }"
          v-for="(list, index) in todayTodoLists"
          :key="index"
        >
          <!-- 分类颜色 -->
          <div class="todo-type" :style="{ backgroundColor: list.color }"></div>
          <!-- 右侧内容 -->
          <div class="todo-item">
            <!-- 勾选框 -->
            <check-box1
              :class="{ checked: list.status }"
              :list="list"
            ></check-box1>

            <!-- 内容 -->
            <div class="item-text">{{ list.content }}</div>
          </div>
          <!-- 右侧按钮 -->
          <div class="todo-btns" v-if="!list.status">
            <div @click="edit(list)">
              <svg-icon icon-class="edit"></svg-icon>
            </div>
            <div class="icon-delete" @click="remove(list.id)">
              <svg-icon icon-class="delete"></svg-icon>
            </div>
          </div>
        </div>
      </div>
      <!-- 无待办事项时显示 缺省页 -->
      <div class="none" v-else>
        <svg-icon :icon-class="`null-${themeColor}`"></svg-icon>
        <span>
          当前暂无待办，点击
          <span :style="{ color: themeColorCode }">右上方按钮</span>
          添加
        </span>
      </div>
    </div>

    <!-- 新建弹窗 -->
    <todo-popup ref="popup"></todo-popup>

    <!-- 提示信息弹窗 -->
    <message-popup ref="msg_popup"></message-popup>
  </div>
</template>

<script>
import Header1 from '@/components/Header.vue'
import Calender from './components/Calender'
import TodoPopup from '@/components/TodoPopup.vue'
import CheckBox1 from '@/components/CheckBox.vue'
import MessagePopup from '@/components/MessagePopup.vue'

import dayjs from 'dayjs'

export default {
  name: 'MyTodo',
  components: {
    Header1,
    Calender,
    TodoPopup,
    CheckBox1,
    MessagePopup
  },

  data() {
    return {
      todayUnix: dayjs(dayjs().format('YYYY-MM-DD')).valueOf() // 今天日期 毫秒 unix
    }
  },

  computed: {
    // 今日待办事项
    todayTodoLists() {
      const selectedDayUnix = this.$store.state.selectedDayUnix
      return this.$store.state.todoLists.filter(item => {
        return item.stampUnix == selectedDayUnix
      })
    }
  },

  methods: {
    // 回到今天
    backToToday() {
      const data = dayjs()
      const year = data.year()
      const month = data.month() + 1
      const date = data.date()
      const currDay = `${year}-${month}-${date}`

      this.$refs.calender.year = year
      this.$refs.calender.month = month
      this.$refs.calender.day = date
      this.$refs.calender.selectedDayUnix = dayjs(currDay).valueOf()
    },

    // 打开新建弹窗
    openNewPopup() {
      // 将弹窗类型设为 新建
      this.$refs.popup.updateType = 'new'
      this.$refs.popup.updateList = null
      this.$refs.popup.inputContent = ''
      this.$refs.popup.newPopupIsOpen = true
    },

    // 修改待办
    edit(list) {
      // 将弹窗类型设为 修改
      this.$refs.popup.updateType = 'update'
      // 传入对应的待办事项
      this.$refs.popup.updateList = list
      this.$refs.popup.inputContent = list.content

      // 打开弹窗
      this.$refs.popup.newPopupIsOpen = true
    },

    // 删除待办
    remove(id) {
      this.$store.commit('deleteTodoList', id)
    },

    // 输入内容为空，弹窗提示
    noContent() {
      this.$refs.msg_popup.openPopup('error', '请输入内容')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

.my-todo-container {
  margin: 2rem;

  // 标题 + 新建按钮
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;

    .title {
      color: $Gray-8;
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 600;
    }

    .button-box {
      display: flex;
      justify-content: space-between;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
        font-size: 0.75rem;
        line-height: 1rem;
        border-radius: 2rem;
        cursor: pointer;
      }

      .back {
        width: 7rem;
        border: 1px solid $Gray-2;

        color: $Gray-6;
        background-color: $BG;

        .svg-icon {
          margin-right: 0.2rem;
        }
      }

      .new {
        width: 10rem;
        margin-left: 1rem;
        border: none;
        color: $BG;
        // background-color: $Theme-6;
      }
    }
  }

  // 日历
  .calender-container {
    position: relative;
    display: flex;
    justify-content: center;
    // min-width: 44.5rem;
    height: 7rem;
    border-radius: 16px;
    background-color: $BG;
    z-index: 10;
  }

  // 待办显示
  .todo-content {
    min-width: 44.5rem;
    height: 37rem;
    margin-top: 1.5rem;
    padding: 0.3rem 0; // 控制
    border-radius: 16px;
    background-color: $BG;

    .none {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 36rem; // TODO:

      .svg-icon {
        width: 18.75rem;
        height: 18.75rem;
        margin-bottom: 1rem;
      }

      span {
        color: $Gray-6;
        font-size: 1rem;

        span {
          color: $Theme-6;
        }
      }
    }

    .today-todo-lists {
      height: 36rem;
      overflow: auto;
      border-radius: 16px;

      // 单条待办
      .today-todo-list {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 5.75rem;
        border-radius: 16px;

        // 分类颜色
        .todo-type {
          position: absolute;
          left: 0.875rem;
          width: 0.25rem;
          height: 2rem;
          border-radius: 0.125rem;
        }

        // 待办事项内容
        .todo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 6rem;
          margin-right: 2rem;

          .todo-text {
            color: $Gray-7;
            font-size: 1rem;
            line-height: 1.5rem;
            letter-spacing: 1px;
            font-weight: 600;
          }
        }

        // 操作按钮
        .todo-btns {
          // position: absolute;
          // right: 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 24rem;
          height: 6rem;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 1)
          );
          opacity: 0;
          transition: 0.2s ease-in-out 0.1s;

          div {
            color: $Gray-6;
            margin-right: 1.5rem;
            cursor: pointer;

            &:hover {
              color: $Theme-6;
            }

            .icon-delete {
              margin-right: 0.5rem;
            }
          }
        }

        &:hover {
          background-color: $Gray-1;
        }
        &:hover .todo-btns {
          opacity: 1;
        }
      }
      .today-todo-list.completed {
        opacity: 0.6;
      }
    }
  }
}
</style>
