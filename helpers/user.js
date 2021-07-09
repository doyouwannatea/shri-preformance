/**
 * показать сессию пользователя 
 * 
 * @param {any[]} data 
 * @param {string | number} requestId 
 * @returns any[]
 */
export function showSession(data, requestId) {
    const result = data.filter(item => item.requestId === requestId)
    console.log(`Пользователь ${requestId}`)
    console.log(result)
    return result
}

/**
 * Посчитать пользователей за определённую дату
 * 
 * @param {any[]} data 
 * @param {Date | string} date 
 * @returns Set<any>
 */
export function countUsersByDate(data, date) {
    const result = new Set(
        data.filter(item => item.date == date)
            .map(item => item.requestId)
    )

    console.log(`Пользователей ${date}: ${result.size}`)
    return result
}
