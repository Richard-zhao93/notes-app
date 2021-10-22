<template>
  <div>
    <router-link
      class="nav hover"
      :class="{ checked: router.to == selectPath }"
      v-for="(router, index) in routes"
      :key="index"
      :to="router.to"
    >
      <svg-icon :icon-class="router.iconClass"></svg-icon>
      <span class="nav-name">{{ router.value }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      selectPath: '/',
      routes: [
        {
          class: 'my-todo',
          iconClass: 'todo',
          value: '我的待办',
          to: '/'
        },
        {
          class: 'dashboard',
          iconClass: 'form',
          value: '数据统计',
          to: '/dashboard'
        },
        {
          class: 'setting',
          iconClass: 'setting',
          value: '设置',
          to: '/setting'
        },
        {
          class: 'about',
          iconClass: 'about',
          value: '关于',
          to: '/about'
        }
      ]
    }
  },
  watch: {
    // 侦听选择路由
    $route(to) {
      this.selectPath = to.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

// 导航栏样式
.nav {
  display: flex;
  align-items: center;
  width: 11.5rem;
  height: 2rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  text-decoration: none;

  .svg-icon {
    color: $Gray-7;
    width: 1.5em;
    height: 1.5em;
    margin-left: 0.5rem;
    margin-right: 1.5rem;
  }

  .nav-name {
    color: $Gray-7;
    font-size: 0.75rem;
    line-height: 1.5rem;
    font-weight: 600;
  }
}

.checked {
  background-color: $Theme-1;
}
</style>
