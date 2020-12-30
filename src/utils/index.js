/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

// 获取当前周 周一和周日的日期
export function getWeekStartDateAndEndDateRange() {
  const oneDayLong = 24 * 60 * 60 * 1000
  const now = new Date()
  const mondayTime = new Date(now.toLocaleDateString()).getTime() - (now.getDay() - 1) * oneDayLong
  const sundayTime = new Date(now.toLocaleDateString()).getTime() + (8 - now.getDay()) * oneDayLong - 1000
  const monday = new Date(mondayTime)
  const sunday = new Date(sundayTime)
  const weekRange = [monday, sunday]
  return weekRange
}
// 获取当前月 起始日和结束日的日期
export function getMonthStartDateAndDateRange() {
  const now = new Date()
  const year = now.getFullYear()
  const monthStartDate = new Date(year, now.getMonth(), 1)// 当前月1号
  const nextMonthStartDate = new Date(year, now.getMonth() + 1, 1)// 下个月1号
  // const days = new Date(year, now.getMonth() + 1, 0).getDate(); // 计算当前月份的天数
  const monthEndDate = nextMonthStartDate.getTime() - 1000 // 月底最后一天 23:59:59
  const monthRange = [monthStartDate, monthEndDate]
  return monthRange
}
// 获取当前年 起始日和结束日的日期
export function getYearStartDateAndDateRange() {
  const now = new Date()
  const year = now.getFullYear()
  const yearStartTime = new Date(new Date(year, 0, 1).toLocaleDateString()).getTime()
  const yearEndTime = new Date(new Date(year + 1, 0, 1).toLocaleDateString()).getTime() - 1000
  const yearRange = [yearStartTime, yearEndTime]
  return yearRange
}
