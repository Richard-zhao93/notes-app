<template>
  <div class="is-completed" @click="changeStatus">
    <div class="bg"></div>
    <svg-icon icon-class="check"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: ['list'],
  methods: {
    // 更新对应待办事项状态
    changeStatus() {
      this.$store.commit('updateTodoListStatus', this.list.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

.is-completed {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin: 0 1.5rem 0 2rem;
  border: 2px solid $Gray-6;
  border-radius: 1rem;
  color: $BG;
  cursor: pointer;

  .svg-icon {
    z-index: 10;
    opacity: 0;
    transform: scale(2);
    transition: 0.2s ease-in-out;
  }

  .bg {
    position: absolute;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background-color: $Theme-6;
    transform: scale(0);
    transition: 0.2s ease-in-out;
  }

  &:hover {
    border: 2px solid $Theme-6;
  }
}

.is-completed.checked > .bg {
  transform: scale(1);
}
.is-completed.checked > svg {
  opacity: 1;
  transform: scale(1);
}
</style>
