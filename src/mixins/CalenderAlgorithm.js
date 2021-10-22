import dayjs from 'dayjs'
import { getThisWeekDaysByUnix } from '@/common/tools'

const calendarAlgorithm = {
  created() {
    this.getInitTime()
  },
  data() {
    return {
      year: null, // 当前年
      month: null, // 当前月
      day: null, // 当前日
      selectedDayUnix: null, // 选中日期的 unix
      thisWeekDays: [] // 本周所有日期
    }
  },
  computed: {
    /**
     * 获取当前月天数
     * @param
     * @returns {Number} 当前月天数
     */
    daysThisMonth() {
      return dayjs(`${this.year}-${this.month}`).daysInMonth()
    },

    // 获取上个月月份
    previousMonth() {
      if (this.month == 1) {
        return 12
      }
      return this.month - 1
    },

    // 获取下个月月份
    nextMonth() {
      if (this.month == 12) {
        return 1
      }
      return this.month + 1
    },

    /**
     * 获取上个月天数
     * @param
     * @returns {Number} 上个月天数
     */
    daysPreviousMonth() {
      return dayjs(`${this.year}-${this.previousMonth}`).daysInMonth()
    },

    /**
     * 获取当前日期的 1 号是星期几
     * @param
     * @returns {Number}
     */
    targetDay() {
      return dayjs(`${this.year}-${this.month}-1`).day()
    },
    visibleDays() {
      /**
       * 数组中包裹对象
       *    type: pre / now / next 表示 上个月 / 本月 / 下个月
       *    num: 日期数字
       *    unix: 时间戳
       */
      let visibleList = []

      this.preMonthDays(visibleList)
      this.thisMonthDays(visibleList)
      this.nextMonthDays(visibleList)

      return visibleList
    }
  },
  methods: {
    // 初始时间
    getInitTime() {
      const date = dayjs()
      this.year = date.year()
      this.month = date.month() + 1
      this.day = date.date()

      // 初始化选中日期 Unix
      this.selectedDayUnix = dayjs(
        `${this.year}-${this.month}-${this.day}`
      ).valueOf()

      // 获取本周七天日期
      this.getThisWeekDays()
    },

    // 获取上月显示天数
    preMonthDays(visibleList) {
      // 上月总天数
      const preMonthAllDays = this.daysPreviousMonth

      // 获取当前日期的 1 号是星期几
      const day = this.targetDay

      for (let i = preMonthAllDays; i > preMonthAllDays - day; i--) {
        visibleList.unshift({
          type: 'pre',
          date: i,
          unix: dayjs(`${this.year}-${this.previousMonth}-${i}`).valueOf()
        })
      }
    },

    // 获取本月显示天数
    thisMonthDays(visibleList) {
      const days = this.daysThisMonth
      for (let i = 1; i < days + 1; i++) {
        visibleList.push({
          type: 'now',
          date: i,
          unix: dayjs(`${this.year}-${this.month}-${i}`).valueOf()
        })
      }
    },

    // 获取下月显示天数
    nextMonthDays(visibleList) {
      const length = visibleList.length

      for (let i = 1; i < 43 - length; i++) {
        visibleList.push({
          type: 'next',
          date: i,
          unix: dayjs(`${this.year}-${this.nextMonth}-${i}`).valueOf()
        })
      }
    },

    // 获取选中日期所在周所有日期
    getThisWeekDays() {
      // 清空原数据
      this.thisWeekDays = []
      this.thisWeekDays = getThisWeekDaysByUnix(this.selectedDayUnix)
    }
  },
  watch: {
    // 选中日期变化将其更新至 vuex
    selectedDayUnix() {
      this.$store.commit('updateSelectedDayUnix', this.selectedDayUnix)
      this.getThisWeekDays()
    }
  }
}

export default calendarAlgorithm
