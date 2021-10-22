/** * 新建弹窗 */
<template>
  <div class="popup-container">
    <!-- 遮罩层 -->
    <transition name="mask">
      <div class="mask" v-if="newPopupIsOpen"></div>
    </transition>

    <!-- 弹窗主体 -->
    <transition name="todo">
      <div class="main" v-if="newPopupIsOpen">
        <!-- 标题 关闭、取消按钮 -->
        <div class="title">
          <h2>{{ updateType == 'new' ? '新建待办' : '修改待办' }}</h2>
          <div class="btns">
            <button class="cancel" @click="cancel">取消</button>
            <button class="save" @click="save">确定</button>
          </div>
        </div>
        <!-- 输入框 -->
        <div class="content">
          <textarea
            class="textarea"
            ref="textarea1"
            placeholder="想做点什么"
            v-model="inputContent"
            @keydown.enter="save($event)"
          ></textarea>
        </div>

        <category ref="category"></category>
      </div>
    </transition>
  </div>
</template>

<script>
import Category from './Category.vue'
import dayjs from 'dayjs'
export default {
  name: 'todoPopup',
  components: {
    Category
  },
  data() {
    return {
      updateType: 'new', // 类型 新建 new 、修改 update
      updateList: null, // 修改对应的待办事项
      newPopupIsOpen: false, // 新建待办页面是否打开
      inputContent: '' // 输入框内容
    }
  },
  methods: {
    // 取消
    cancel() {
      // 关闭弹窗
      this.newPopupIsOpen = false
    },

    //保存
    save(event) {
      // 阻止默认换行
      // 注意此处使用 keydown 事件，使用 keyup 事件无法阻止默认换行
      // 因为在 keydown 过程已经发生换行
      event.preventDefault()

      let content = this.inputContent.trim()
      if (!content) {
        this.$parent.noContent()
        return
      }
      // 当前待办的颜色类型
      const type = this.$refs.category.thisClass
      const stampUnix = this.$store.state.selectedDayUnix
      // 根据弹窗类型获取 ID
      let id =
        this.updateType === 'new' ? dayjs().valueOf() : this.updateList.id

      const list = {
        id,
        stampUnix: stampUnix,
        ...type,
        content: content,
        status: false
      }

      // 保存待办事项至 vuex
      this.$store.commit(
        this.updateType === 'new' ? 'createTodoList' : 'updateTodoList',
        list
      )

      // 关闭弹窗
      this.newPopupIsOpen = false
      // 清空数据
      this.inputContent = ''
      // 初始化分类颜色
      this.$refs.category.thisClass = {
        name: '红色',
        color: '#ef4444',
        secondaryColor: '#fee2e2'
      }
    }
  },
  watch: {
    // 如果是修改，变换 Category 选中颜色
    newPopupIsOpen() {
      this.$nextTick(() => {
        if (this.updateType == 'update' && this.newPopupIsOpen) {
          const thisClass = {
            name: this.updateList.name,
            color: this.updateList.color,
            secondaryColor: this.updateList.secondaryColor
          }

          this.$refs.category.changeType(thisClass)
          this.$refs.textarea1.focus()
        }
        // 输入框自动聚焦
        this.$refs.textarea1 && this.$refs.textarea1.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

.popup-container {
  // 遮罩层动画
  .mask-enter-active {
    animation: anim 0.4s ease-in-out;
  }
  .mask-leave-active {
    animation: anim 0.6s ease-in-out reverse;
  }
  @keyframes anim {
    0% {
      background-color: rgba(0, 0, 0, 0);
      /* backdrop-filter: blur(0px); */
    }
    100% {
      background-color: rgba(0, 0, 0, 0.4);
      /* backdrop-filter: blur(10px); */
    }
  }

  // 遮罩层
  .mask {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99;
    overflow: hidden;
  }

  // 弹窗主体
  .todo-enter-active {
    animation: anim1 0.4s ease-in-out;
  }
  .todo-leave-active {
    animation: anim2 0.6s;
  }
  @keyframes anim1 {
    0% {
      top: calc(50% - 14rem);
      opacity: 0;
    }
    100% {
      top: calc(50% - 12rem);
      opacity: 1;
    }
  }
  @keyframes anim2 {
    0% {
      top: calc(50% - 12rem);
      opacity: 1;
    }
    100% {
      top: calc(50% - 10rem);
      opacity: 0;
    }
  }
  .main {
    z-index: 100;
    width: 52rem;
    min-height: 16rem;
    max-height: 36rem;
    padding: 2rem;
    border-radius: 16px;
    // opacity: 1;
    background-color: $BG;
    position: absolute;
    top: calc(50% - 12rem);
    left: calc(50% - 26rem);

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 2rem;

      > h2 {
        color: $Gray-8;
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 600;
      }

      .btns {
        button {
          border: 0;
          background: none;
          font-size: 1.25rem;
          line-height: 2rem;
          font-weight: 600;
          cursor: pointer;
        }

        .cancel {
          color: $Gray-6;

          &:hover {
            color: $Gray-7;
          }
          &:active {
            color: $Gray-8;
          }
        }

        .save {
          margin-left: 2rem;
          color: $Theme-6;

          &:hover {
            color: $Theme-7;
          }

          &:active {
            color: $Theme-9;
          }
        }
      }
    }

    // 输入框
    .content {
      .textarea {
        width: 100%;
        min-height: 4rem;
        margin: 2rem 0;
        border: 0;
        color: $Gray-7;
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 400;
        letter-spacing: 2px;
        outline: none;
        resize: none;

        &::placeholder {
          color: var(--Gray-4);
        }
      }
    }
  }
}
</style>
