<template>
  <div class="category-container">
    <div class="list-class" :style="{ borderColor: thisClass.secondaryColor }">
      <div
        class="base-list-class"
        :style="{ backgroundColor: thisClass.color }"
      ></div>
    </div>
    <p class="name">选择分类</p>
    <div class="class-hover">
      <div
        v-for="(list, index) in classLists"
        :key="index"
        class="list-class"
        :style="{ borderColor: list.secondaryColor }"
        @click="changeType(list)"
      >
        <div
          class="base-list-class"
          :style="{ backgroundColor: list.color }"
        ></div>
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
      ],
      // 当前分类颜色， 默认红色
      thisClass: {
        name: '红色',
        color: '#ef4444',
        secondaryColor: '#fee2e2'
      }
    }
  },
  methods: {
    // 修改分类
    changeType(list) {
      this.thisClass = list
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

.category-container {
  display: flex;
  align-items: center;
  width: 7rem;
  height: 2rem;
  margin-right: 1rem;
  cursor: pointer;
  border-radius: 6px;

  .list-class {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin: 0 0.25rem;
    // border: 2px solid #fee2e2;
    border-width: 2px;
    border-style: solid;
    border-radius: 100%;

    .base-list-class {
      width: 0.875rem;
      height: 0.875rem;
      border-radius: 100%;
      // background-color: #ef4444;
    }
  }

  .name {
    margin: 0 0.25rem;
    color: $Gray-6;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .class-hover {
    z-index: 101;
    position: absolute;
    top: 14.3rem;
    display: none;

    align-items: center;
    width: auto;
    height: 3rem;
    padding: 0 2rem;
    border-radius: 6px;
    background-color: $BG;
    box-shadow: 0 12px 30px 4px rgba(148, 163, 184, 0.3);
  }

  &:hover .class-hover {
    display: flex;
  }
}
</style>
