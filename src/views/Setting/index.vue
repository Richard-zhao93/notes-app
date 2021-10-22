<template>
  <div class="setting-container">
    <!-- 头部搜索框 -->
    <header1></header1>

    <!-- 标题 -->
    <div class="title">
      <p>设置</p>
    </div>

    <!-- 设置盒子 -->
    <div class="box">
      <div class="set-list">
        <span class="name">主题皮肤</span>
        <div class="colors" @click="changeTheme($event)">
          <div class="color-list" data-color="blue">
            <div class="color-info blue" data-color="blue">蓝<br />色</div>
            <svg-icon
              v-if="theme == 'blue'"
              icon-class="check"
              data-color="blue"
            ></svg-icon>
          </div>
          <div class="color-list" data-color="emerald">
            <div class="color-info emerald" data-color="emerald">
              祖<br />母
            </div>
            <svg-icon
              v-if="theme == 'emerald'"
              icon-class="check"
              data-color="emerald"
            ></svg-icon>
          </div>
          <div class="color-list" data-color="rose">
            <div class="color-info rose" data-color="rose">玫<br />瑰</div>
            <svg-icon
              v-if="theme == 'rose'"
              icon-class="check"
              data-color="rose"
            ></svg-icon>
          </div>
          <div class="color-list" data-color="orange">
            <div class="color-info orange" data-color="orange">橘<br />色</div>
            <svg-icon
              v-if="theme == 'orange'"
              icon-class="check"
              data-color="orange"
            ></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header1 from '@/components/Header.vue'

export default {
  name: 'setting',
  components: {
    Header1
  },
  data() {
    return {
      theme: ''
    }
  },
  methods: {
    // 修改主题颜色
    changeTheme(event) {
      const color = event.target.dataset.color
      if (color) {
        this.theme = color
        this.$store.commit('changeThemeColor', color)
      }
    }
  },
  created() {
    // 初始化 theme 为选中主题
    this.theme = this.themeColor
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

.setting-container {
  height: 93.3vh;
  margin: 2rem;

  // 标题
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;

    p {
      color: $Gray-8;
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  // box
  .box {
    display: flex;
    align-items: center;
    height: 6rem;
    margin-bottom: 2rem;
    padding: 0 2rem;
    border-radius: 16px;
    background-color: $BG;

    .set-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 6rem;

      .name {
        color: $Gray-8;
        line-height: 2rem;
        font-weight: 500;
      }

      .colors {
        display: flex;
        align-items: center;
        height: 6rem;

        .color-list {
          overflow: hidden;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 2.5rem;
          height: 2.5rem;
          margin: 0 0.8rem;
          color: #fff;
          border-radius: 100%;
          // box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2) inset;
          transition: 0.1s ease-in-out;

          .color-info {
            position: absolute;
            left: 0;
            font-size: 1.5rem;
            font-weight: 800;
            line-height: 1.7rem;
          }

          .svg-icon {
            z-index: 10;
          }

          .blue {
            color: #1d4ed8;
          }
          .emerald {
            color: #047857;
          }
          .rose {
            color: #be123c;
          }
          .orange {
            color: #c2410c;
          }
        }

        .color-list:hover {
          width: 3rem;
          height: 3rem;
        }

        .color-list:nth-of-type(1) {
          background-image: linear-gradient(to bottom right, #3b82f6, #2563eb);
          box-shadow: 0 0 16px 0 rgba(30, 58, 138, 0.4) inset;
          box-shadow: 0 0 0 0 #bfdbfe;
        }
        .color-list:nth-of-type(2) {
          background-image: linear-gradient(to bottom right, #10b981, #059669);
          box-shadow: 0 0 16px 0 rgba(6, 78, 59, 0.4) inset;
          box-shadow: 0 0 0 0 #a7f3d0;
        }
        .color-list:nth-of-type(3) {
          background-image: linear-gradient(to bottom right, #f43f5e, #e11d48);
          box-shadow: 0 0 16px 0 rgba(136, 19, 55, 0.4) inset;
          box-shadow: 0 0 0 0 #fecdd3;
        }
        .color-list:nth-of-type(4) {
          background-image: linear-gradient(to bottom right, #f97316, #ea580c);
          box-shadow: 0 0 16px 0 rgba(124, 45, 18, 0.4) inset;
          box-shadow: 0 0 0 0 #fed7aa;
        }

        .color-list:nth-of-type(1):hover {
          box-shadow: 0 0 24px 0 #bfdbfe;
        }
        .color-list:nth-of-type(2):hover {
          box-shadow: 0 0 24px 0 #a7f3d0;
        }
        .color-list:nth-of-type(3):hover {
          box-shadow: 0 0 24px 0 #fecdd3;
        }
        .color-list:nth-of-type(4):hover {
          box-shadow: 0 0 24px 0 #fed7aa;
        }
      }
    }
  }
}
</style>
