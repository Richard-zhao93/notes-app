<template>
  <div class="home-container">
    <!-- 左侧导航栏 -->
    <div class="nav-container">
      <!-- LOGO -->
      <div class="logo-box">
        <svg-icon icon-class="logo"></svg-icon>
        <span>TO DO LIST</span>
      </div>

      <!-- 用户信息 -->
      <div class="user hover">
        <div class="profile" :style="{ backgroundColor: themeColorCode }">
          U
        </div>
        <span>User Name</span>
      </div>

      <!-- 导航栏 -->
      <nav-bar></nav-bar>

      <!-- 分类 -->
      <category></category>
    </div>

    <!-- 主视区 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import Category from './components/Category'

export default {
  name: 'Home',
  components: {
    NavBar,
    Category
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

.home-container {
  display: flex;
  // 左侧导航栏样式
  .nav-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 15.5rem;
    height: 100vh;
    background-color: $BG;
    overflow: hidden;

    // Logo 样式
    .logo-box {
      display: flex;
      align-items: center;
      width: 11.5rem;
      height: 3.5rem;
      margin-top: 3rem;
      padding-left: 0.2rem;
      background-color: $BG;

      .svg-icon {
        width: 40px;
        height: 40px;
        margin-right: 15px;
      }

      span {
        font-size: 22px;
        // color: rgb(124, 195, 245);
        font-weight: bolder;
      }
    }

    // 用户信息样式
    .user {
      display: flex;
      align-items: center;
      width: 11.5rem;
      height: 3rem;
      margin-top: 2rem;
      margin-bottom: 1.5rem;
      border-radius: 6px;

      .profile {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin-left: 5px;
        margin-right: 15px;
        background-color: $Theme-6;
        border-radius: 20px;
        color: $BG;
      }

      span {
        font-size: 0.75rem;
        color: $Gray-7;
        font-weight: 700;
        line-height: 1.5rem;
      }
    }
  }

  // 主视区
  .main {
    margin-left: 15.5rem;
    width: 100%;
    overflow: hidden;

    background-color: #f1f2f6;
  }
}
</style>
