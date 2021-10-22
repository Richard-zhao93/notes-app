import dayjs from 'dayjs'

//
/**
 *获取指定日期所在周的所有日期
 * @export
 * @param {Number} dayUnix 指定日期的毫秒数
 * @return {Array} 指定日期所在周的所有日期数组
 * 返回数组包裹对象的格式：
 * @param {String} type 事件类型 上/本/下 月
 * @param {Number} year 年
 * @param {Number} month 月
 * @param {Number} date 日
 * @param {Number} unix 日期毫秒数
 */
export function getThisWeekDaysByUnix(dayUnix) {
  const thisWeekDays = [] // 初始化一个存放日期的数组
  const oneDayTime = 24 * 60 * 60 * 1000 // 一天的毫秒数
  const thisDay = dayjs(+dayUnix)
  const day = thisDay.day() // 周几
  const thisYear = thisDay.year()
  const thisMonth = thisDay.month() + 1

  for (let i = 0; i < 7; i++) {
    const dateUnix = dayUnix - (day - i) * oneDayTime
    const data = dayjs(dateUnix)
    const year = data.year()
    const month = data.month() + 1
    const date = data.date()

    const unix = dayjs(`${year}-${month}-${date}`).valueOf()

    // type 处理
    let type = 'now'
    if (year > thisYear) type = 'next'
    if (year < thisYear) type = 'pre'
    if (month > thisMonth) type = 'next'
    if (month < thisMonth) type = 'pre'

    thisWeekDays.push({
      type,
      year,
      month,
      date,
      unix
    })
  }

  return thisWeekDays
}
