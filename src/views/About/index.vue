<template>
  <div class="about-container">
    <header1></header1>

    <div class="about-box">
      <!-- Logo -->
      <div class="logo-box">
        <svg-icon icon-class="logo" class="logo"></svg-icon>
      </div>

      <!-- 标题 -->
      <div class="title">TO DO LIST</div>

      <!-- 介绍 -->
      <div class="info">
        <p>Version 0.1.0</p>
        <p>随时随地获取、整理备忘，让灵感时刻与你同行</p>
      </div>

      <!-- todo -->
      <div class="todo">
        <div class="unfinished">
          <h5>未完成功能</h5>
          <p>账号登录</p>
          <p>搜索功能</p>
          <p>分类功能</p>
        </div>
        <div class="will-do">
          <h5>未来可能添加的功能</h5>
          <p>深色模式</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header1 from '@/components/Header.vue'

export default {
  name: 'MyTodo',
  components: {
    Header1
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

.about-container {
  height: 100vh;
  margin: 2rem;

  .about-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // logo
    .logo-box {
      width: 12rem;
      height: 12rem;
      border: 0.5rem solid #fff;
      border-radius: 100%;
      margin: 4rem 0 1.5rem 0;

      display: flex;
      justify-content: center;
      align-items: center;
      .logo {
        width: 10rem;
        height: 10rem;
      }
    }

    // 标题
    .title {
      font-size: 2rem;
      font-weight: 700;

      margin-bottom: 2rem;
    }

    // 介绍
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: $Gray-5;
      font-size: 0.8rem;

      margin-bottom: 6rem;
    }

    // 功能
    .todo {
      display: flex;
      justify-content: space-between;
      width: 16rem;
      color: $Gray-7;
      font-size: 0.75rem;

      h5 {
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
    }
  }
}
</style>
