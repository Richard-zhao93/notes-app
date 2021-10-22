<template>
  <div class="calender-container">
    <!-- 展开前的日期显示 -->
    <div class="unopened" v-show="!calendarIsOpen">
      <!-- 星期 -->
      <div class="unopened-weeks">
        <p
          class="unopened-week-title"
          v-for="(item, index) in weeks"
          :key="index"
        >
          {{ item }}
        </p>
      </div>

      <!-- 本周七天 -->
      <div class="week-box-container" @click="handleChooseDay($event)">
        <div
          class="week-box"
          v-for="(item, index) in thisWeekDays"
          :key="index"
        >
          <span
            :data-unix="item.unix"
            :style="item.unix == selectedDayUnix ? selectedDayStyle : ''"
            class="week-day-num"
            :class="[item.type !== 'now' ? 'not-this-month' : '']"
          >
            {{ item.date }}
          </span>
        </div>
      </div>

      <!-- 展开和关闭按钮 -->
      <div class="switch">
        <div @click="switchBox">
          <svg-icon icon-class="bar"></svg-icon>
        </div>
      </div>
    </div>

    <!-- 展开后的日历盒子 -->
    <transition name="calender">
      <div class="calender-box" v-if="calendarIsOpen">
        <!-- 日期标题和切换按钮 -->
        <div class="calender-title">
          <div class="arrow-box" @click="toPreviousMonth">
            <svg-icon class="left-arrow" icon-class="jiantou"></svg-icon>
          </div>
          <div class="title-text">
            {{ year + '年' + month + '月' + day + '日' }}
          </div>
          <div class="arrow-box" @click="toNextMonth">
            <svg-icon class="right-arrow" icon-class="jiantou"></svg-icon>
          </div>
        </div>

        <!-- 星期 -->
        <div class="weeks">
          <p class="week-title" v-for="(item, index) in weeks" :key="index">
            {{ item }}
          </p>
        </div>

        <!-- 日历主体 -->
        <div class="calender-body" @click="handleChooseDay($event)">
          <div
            class="day-box"
            v-for="(item, index) in visibleDays"
            :key="index"
          >
            <span
              class="day-num"
              :data-unix="item.unix"
              :style="item.unix == selectedDayUnix ? selectedDayStyle : ''"
              :class="[item.type !== 'now' ? 'not-this-month' : '']"
              >{{ item.date }}</span
            >
          </div>
        </div>

        <!-- 展开和关闭按钮 -->
        <div class="switch">
          <div @click="switchBox">
            <svg-icon icon-class="bar"></svg-icon>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CalendarAlgorithm from '@/mixins/CalenderAlgorithm'

export default {
  name: 'Calender',
  mixins: [CalendarAlgorithm],
  data() {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      // 盒子开关状态
      calendarIsOpen: false
    }
  },
  methods: {
    // 使用事件委托
    // 点击选择日期
    handleChooseDay($event) {
      if ($event.target.dataset && $event.target.dataset.unix) {
        // 点击日期，将选中日期变为选择日期
        this.selectedDayUnix = $event.target.dataset.unix
      }
    },
    // 控制日历盒子的显隐
    switchBox() {
      this.calendarIsOpen = !this.calendarIsOpen
    },

    // 点击切换至上个月
    toPreviousMonth() {
      if (this.month == 1) this.year = this.year - 1
      this.month = this.previousMonth
    },

    // 点击切换至下个月
    toNextMonth() {
      if (this.month == 12) this.year = this.year + 1
      this.month = this.nextMonth
    }
  },
  computed: {
    selectedDayStyle() {
      return {
        color: '#fff',
        backgroundColor: this.themeColorCode
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variable';

.calender-container {
  // 未展开前的日期显示
  .unopened {
    // width: 35rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .unopened-weeks {
      width: 35rem;
      display: flex;
      align-items: center;
      margin-top: 1rem;

      // 星期文字
      .unopened-week-title {
        width: 4rem;
        color: $Gray-6;
        font-size: 0.75rem;
        line-height: 1rem;
        margin-right: 1rem;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .week-box-container {
      display: flex;
      .week-box {
        width: 4rem;
        height: 4rem;
        margin-right: 1rem;

        display: flex;
        justify-content: center;
        align-items: center;

        // 盒子数字
        .week-day-num {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          color: $Gray-8;
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 600;
          transition: 0.1s;

          &:hover {
            background-color: $Theme-1;
          }
        }
      }
    }
  }

  // 日历盒子
  .calender-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: 44.5rem;
    // height: 7rem;
    border-radius: 16px;
    background-color: $BG;
    overflow: hidden;

    position: absolute;
    top: 0;
    box-shadow: 0 16px 36px 0 rgba(148, 163, 184, 0.2);

    // 日历标题
    .calender-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      min-width: 25rem;
      height: 2rem;
      margin-top: 0.5rem;

      // 包裹箭头的盒子
      .arrow-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;

        &:hover {
          background-color: $Gray-2;
          .svg-icon {
            color: $Gray-8;
          }
        }
        &:active {
          background-color: $Gray-6;
          .svg-icon {
            color: $BG;
          }
        }

        .svg-icon {
          color: $Gray-6;
          width: 1.2rem;
          height: 1.2rem;
        }

        .right-arrow {
          transform: rotate((180deg));
        }
      }

      // 标题
      .title-text {
        color: $Gray-7;
        font-size: 1.2rem;
        line-height: 2rem;
        font-weight: 600;
        letter-spacing: 1px;
      }
    }

    // 星期
    .weeks {
      width: 35rem;
      display: flex;
      align-items: center;
      margin-top: 1.5rem;

      // 星期文字
      .week-title {
        width: 4rem;
        color: $Gray-6;
        font-size: 0.75rem;
        line-height: 1rem;
        margin-right: 1rem;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    // 日历主体
    .calender-body {
      display: flex;
      flex-wrap: wrap;
      width: 35rem;
      height: 34rem;

      // 每个小盒子
      .day-box {
        width: 4rem;
        height: 4rem;
        margin-right: 1rem;

        display: flex;
        justify-content: center;
        align-items: center;

        // 盒子数字
        .day-num {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          color: $Gray-8;
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 600;
          transition: 0.1s;

          &:hover {
            background-color: $Theme-1;
          }
        }
      }
    }
  }

  .switch {
    position: absolute;
    bottom: -10px;
    cursor: pointer;

    .svg-icon {
      width: 2rem;
      height: 2rem;
      color: gray;
      opacity: 0.8;
    }
  }

  // 非本月日期
  .not-this-month {
    color: $Gray-6 !important;
  }
}

// 日历主体动画
.calender-enter-active {
  animation: anim1 0.4s ease-in-out;
}
.calender-leave-active {
  animation: anim2 0.6s;
}
@keyframes anim1 {
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: 34rem;
    opacity: 1;
  }
}
@keyframes anim2 {
  0% {
    height: 34rem;
    opacity: 1;
  }
  100% {
    height: 0;
    opacity: 0;
  }
}
</style>
