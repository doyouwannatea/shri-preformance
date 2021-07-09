import { printQuantile } from './quantile.js'

/**
 * рассчитать метрику за выбранный день
 * 
 * @param {any[]} data 
 * @param {string} page 
 * @param {string} name 
 * @param {Date | string} date 
 * @returns any[]
 */
export function calcMetricByDate(data, page, name, date) {
    const sampleData = data
        .filter(item => item.page == page && item.name == name && item.date == date)
        .map(item => item.value)

    printQuantile(sampleData, date, name)
    return sampleData
}

/**
 * получить определённую метрику
 * 
 * @param {any[]} data 
 * @param {string} page 
 * @param {string} name 
 * @returns any[]
 */
export function getMetric(data, page, name) {
    const sampleData = data
        .filter(item => item.page == page && item.name == name)

    return sampleData
}

/**
 * сравнить метрику в разных срезах ✅
 * 
 * @param {string} descr
 * @param {{ name: string, data: any[] }} metric1 
 * @param {{ name: string, data: any[] }} metric2
 */
export function compareMetric(descr, metric1, metric2) {
    console.log(descr)

    console.log(metric1.name)
    printQuantile(metric1.data)

    console.log(metric2.name)
    printQuantile(metric2.data)
}

/**
 * показать значение метрики за несколько дней
 * 
 * @param {any[]} data 
 * @param {Date | string} startDate 
 * @param {Date | string} endDate 
 * @returns any[]
 */
export function showMetricByPeriod(data, startDate, endDate) {
    const startTime = new Date(startDate).getTime()
    const endTime = new Date(endDate).getTime()

    const result = data.filter(item => {
        const time = new Date(item.date).getTime()
        return time >= startTime && time <= endTime
    })

    console.log(`Метрики с ${startDate} по ${endDate}`)
    console.log(result)
    return result
}