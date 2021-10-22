<template>
  <div class="data-report">
    <div class="box hover" v-for="(item, index) in visibleInfo" :key="index">
      <div class="data">
        <span class="number">{{ item.data }}</span>
        <span class="unit">{{ item.unit }}</span>
      </div>
      <p class="label">{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getThisWeekDaysByUnix } from '@/common/tools'

export default {
  name: 'DataReport',
  data() {
    return {
      visibleInfo: [
        {
          title: '昨日完成待办',
          data: 6,
          unit: '项'
        },
        {
          title: '昨日完成率',
          data: 100,
          unit: '%'
        },
        {
          title: '本周期未完成待办',
          data: 2,
          unit: '项'
        },
        {
          title: '本周期完成待办',
          data: 3,
          unit: '项'
        },
        {
          title: '本周期完成率',
          data: 89,
          unit: '%'
        }
      ]
    }
  },
  computed: {
    // 获取昨日所有待办
    getYesterdayAllList() {
      const yesterday = dayjs(dayjs().format('YYYY-MM-DD'))
        .subtract(1, 'day')
        .valueOf()

      return this.$store.getters.getTodayTodoLists(yesterday)
    },

    // 获取昨日所有完成待办
    getYesterdayFinishedList() {
      const yesterdayFinishedLists = this.getYesterdayAllList.filter(
        item => item.status
      )

      return yesterdayFinishedLists
    },

    // 计算昨日完成率
    getCompletionRate() {
      const allListNum = this.getYesterdayAllList.length
      const finishedListNum = this.getYesterdayFinishedList.length

      if (allListNum) {
        return Math.round((finishedListNum / allListNum) * 100)
      }
      return 0
    },

    // 获取本周所有待办
    getThisWeekAllTodoLists() {
      const todayUnix = dayjs(dayjs().format('YYYY-MM-DD')).valueOf()
      // 获取本周所有日期
      const weeks = getThisWeekDaysByUnix(todayUnix)
      const thisWeekAllTodoList = []
      for (let i = 0; i < weeks.length; i++) {
        const todayTodoLists = this.$store.getters.getTodayTodoLists(
          weeks[i].unix
        )

        // TODO:
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        thisWeekAllTodoList.push(todayTodoLists)
      }
      return thisWeekAllTodoList
    },

    // 获取本周所有待办数量
    getThisWeekAllTodoTotal() {
      return this.getThisWeekAllTodoLists.reduce((total, item) => {
        return total + item.length
      }, 0)
    },

    // 获取本周每天完成的待办事项，按日期顺序返回一个数组
    getThisDayFinishedNum() {
      const finishedLists = []

      for (let i = 0; i < this.getThisWeekAllTodoLists.length; i++) {
        const thisDayFinishedNum = this.getThisWeekAllTodoLists[i].filter(
          item => item.status
        ).length

        finishedLists.push(thisDayFinishedNum)
      }

      return finishedLists
    },

    // 获取本周完成待办总数
    getThisWeekFinishedTotal() {
      return this.getThisDayFinishedNum.reduce((total, num) => total + num, 0)
    },

    // 获取本周完成率
    getThisWeekFinishedRate() {
      if (!this.getThisWeekAllTodoTotal) return 0
      return Math.round(
        (this.getThisWeekFinishedTotal / this.getThisWeekAllTodoTotal) * 100
      )
    }
  },
  created() {
    this.visibleInfo[0].data = this.getYesterdayFinishedList.length
    this.visibleInfo[1].data = this.getCompletionRate
    this.visibleInfo[2].data =
      this.getThisWeekAllTodoTotal - this.getThisWeekFinishedTotal
    this.visibleInfo[3].data = this.getThisWeekFinishedTotal
    this.visibleInfo[4].data = this.getThisWeekFinishedRate
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

.data-report {
  position: relative;
  // overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 21.5rem;
  border-radius: 16px;
  background-color: $BG;

  .box {
    width: 33.33%;
    height: 50%;
    display: flex;
    // flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid $Gray-2;

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      border-bottom: 1px solid $Gray-2;
    }

    .data {
      display: flex;
      align-items: baseline;
      justify-content: flex-start;

      .number {
        color: $Gray-7;
        font-size: 3rem;
        font-weight: 600;
        line-height: 3rem;
        letter-spacing: 1px;
      }

      .unit {
        color: $Gray-6;
        font-weight: 500;
        margin-left: 0.3rem;
      }
    }

    .label {
      margin-top: 1rem;
      color: $Gray-6;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 1px;
    }
  }
}
</style>
