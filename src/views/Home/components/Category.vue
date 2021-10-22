<template>
  <div>
    <div class="category">
      <div class="title">分类</div>
      <div
        class="color-li hover"
        v-for="(list, index) in classLists"
        :key="index"
      >
        <!-- 外圈 border color -->
        <div class="list-class" :style="{ borderColor: list.secondaryColor }">
          <!-- 内圈 background color -->
          <div
            class="base-list-class"
            :style="{ backgroundColor: list.color }"
          ></div>
        </div>
        <span>{{ list.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {
      classLists: [
        {
          name: '红色',
          color: '#ef4444',
          secondaryColor: '#fee2e2'
        },
        {
          name: '蓝色',
          color: '#3b82f6',
          secondaryColor: '#dbeafe'
        },
        {
          name: '绿色',
          color: '#10b981',
          secondaryColor: '#d1fae5'
        },
        {
          name: '橘色',
          color: '#f97316',
          secondaryColor: '#ffedd5'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

// 分类
.category {
  width: 11.5rem;
  .title {
    padding-left: 0.5rem;
    margin-bottom: 1.5rem;
    color: $Gray-6;
    font-size: 0.75rem;
    line-height: 1.5rem;
  }

  .color-li {
    display: flex;
    align-items: center;
    height: 2rem;
    margin-bottom: 0.75rem;
    border-radius: 6px;

    .list-class {
      width: 24px;
      height: 24px;
      margin: 0 1.5rem 0 0.5rem;
      border-width: 2px;
      border-style: solid;
      border-radius: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      .base-list-class {
        width: 0.875rem;
        height: 0.875rem;
        border-radius: 100%;
      }
    }

    > span {
      color: $Gray-7;
      font-size: 0.75rem;
      line-height: 1.5rem;
      font-weight: 600;
    }
  }
}
</style>
