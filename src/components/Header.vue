<template>
  <header class="header">
    <input type="text" placeholder="搜索功能暂不可用" />
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 6rem;

  input {
    width: 19.5rem;
    height: 2.5rem;
    padding: 0 1.5rem;
    border: none;
    color: $Gray-4;
    border-radius: 2.5rem;
  }
}
</style>
