<template>
  <div class="dashboard-container">
    <!-- 头部搜索 -->
    <header1></header1>

    <!-- title -->
    <div class="top">
      <div class="title">数据统计（本周）</div>
      <div class="tips" v-if="showTip">
        <svg-icon icon-class="warning" class="warning-icon"></svg-icon>
        <p class="tip-info">
          当前展示的是示例数据，你的统计数据将在您使用一段时间后生成。
        </p>
        <div class="close" @click="showTip = flase">
          <svg-icon icon-class="close" class="close-icon"></svg-icon>
        </div>
      </div>
    </div>

    <!-- 折线图 -->
    <div class="chart">
      <data-chart ref="dataChart"></data-chart>
    </div>

    <!-- 时间掌控程度评估 -->
    <!-- <div class="analysis-model">
      <h1>时间掌控程度评估 TODO</h1>
    </div> -->

    <!-- data report -->
    <dataReport></dataReport>
  </div>
</template>

<script>
import Header1 from '@/components/Header.vue'
import DataReport from './components/DataReport'
import DataChart from './components/DataChart'

export default {
  name: 'Dashboard',
  components: {
    Header1,
    DataReport,
    DataChart
  },
  data() {
    return {
      showTip: true // 控制提示信息的显隐，默认为 true
    }
  },
  created() {
    this.$nextTick(() => {
      this.showTip = !this.$refs.dataChart.getThisWeekFinishedTotal()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

.dashboard-container {
  margin: 2rem;

  .top {
    min-width: 52rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;

    // 标题
    .title {
      color: $Gray-8;
      font-size: 1.5rem;
      font-weight: 600;
    }

    // 提示信息
    .tips {
      display: flex;
      align-items: center;
      justify-content: space-around;
      min-width: 38rem;
      height: 3rem;
      padding: 0 2rem;
      border-radius: 6px;
      background-color: $BG;

      .tip-info {
        margin: 0 1rem;
        color: $Gray-7;
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 1px;
      }

      // 关闭按钮
      .close {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        color: $Gray-7;
        border-radius: 100%;
        background-color: $Gray-2;
        cursor: pointer;
      }
    }
  }

  // 折线图
  .chart {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 44.5rem;
    margin-bottom: 1.5rem;

    height: 31.5rem;
    padding: 2rem;
    border-radius: 16px;
    background-color: $BG;
  }

  // 时间掌控程度评估
  .analysis-model {
    width: 100%;
    min-width: 44.5rem;
    height: 31rem;
    margin-bottom: 1.5rem;
    border-radius: 16px;
    background-color: $BG;
  }
}
</style>
