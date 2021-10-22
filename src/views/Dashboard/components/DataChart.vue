<template>
  <div class="chart-container">
    <div id="chart-main"></div>
  </div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer
])

import dayjs from 'dayjs'
import { getThisWeekDaysByUnix } from '@/common/tools'

export default {
  name: 'DataChart',
  methods: {
    // 获取本周所有日期
    getThisWeekDays() {
      const todayUnix = dayjs(dayjs().format('YYYY-MM-DD')).valueOf()
      const weeks = getThisWeekDaysByUnix(todayUnix)

      const dateArr = []
      for (let i = 0; i < weeks.length; i++) {
        dateArr.push(`${weeks[i].month}/${weeks[i].date}`)
      }

      return dateArr
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

        thisWeekAllTodoList.push(todayTodoLists)
      }

      return thisWeekAllTodoList
    },

    // 获取本周所有待办数量
    getThisWeekAllTodoTotal() {
      const arr = this.getThisWeekAllTodoLists()
      return arr.reduce((total, item) => {
        return total + item.length
      }, 0)
    },

    // 获取本周每天完成的待办事项，按日期顺序返回一个数组
    getThisDayFinishedLists() {
      const arr = this.getThisWeekAllTodoLists()
      const finishedLists = []

      for (let i = 0; i < arr.length; i++) {
        const thisDayFinishedNum = arr[i].filter(item => item.status).length
        finishedLists.push(thisDayFinishedNum)
      }

      return finishedLists
    },

    // 获取本周完成待办总数
    getThisWeekFinishedTotal() {
      const arr = this.getThisDayFinishedLists()
      return arr.reduce((total, num) => total + num, 0)
    },

    // 渲染 eCharts
    renderChart() {
      const total = this.getThisWeekFinishedTotal() // 本周总代办数
      const finishedTotal = this.getThisWeekAllTodoTotal() // 本周完成待办数
      // title 设置
      let title = {
        text: `{text|本周共设置}{num| ${total} }{text|项待办，共完成}{num| ${finishedTotal} }{text|项}`,
        textStyle: {
          rich: {
            text: {
              color: 'rgba(15, 23, 42, 0.65)',
              fontWeight: 600,
              fontSize: '1rem'
            },
            num: {
              margin: '0 0.5rem',
              color: 'rgba(15, 23, 42, 0.85)',
              fontSize: '2.25rem',
              fontWeight: 600
            }
          }
        }
      }

      const xAxisArr = this.getThisWeekDays()
      let datas = this.getThisDayFinishedLists()
      datas = total ? datas : [5, 20, 36, 10, 10, 20, 30]

      // 基于准备好的dom，初始化echarts实例
      var chartDom = echarts.init(document.getElementById('chart-main'))

      // 绘制图表
      chartDom.setOption({
        title,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          data: xAxisArr,
          axisLine: {
            show: false
          },
          // 刻度线
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            // 坐标轴轴线
            axisLine: {
              show: false
            },
            // 坐标轴刻度标签
            axisLabel: {
              show: false
            },
            splitLine: {
              // 是否显示分割线
              show: false
            }
          }
        ],
        series: [
          {
            // name: '销量',
            type: 'line',
            smooth: true,
            data: datas,
            itemStyle: {
              normal: {
                color: this.themeColorCode //改变折线点的颜色
              }
            },
            lineStyle: {
              color: this.themeColorCode, //改变折线颜色
              width: 4.5
            }
          }
        ]
      })
    }
  },
  created() {
    this.$nextTick(() => {
      this.renderChart()
    })
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;

  #chart-main {
    width: 100%;
    height: 30rem;
    margin-right: 0;
  }
}
</style>
