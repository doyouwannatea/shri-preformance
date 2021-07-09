/**
 * Получить значение из массива
 * 
 * @param {any[]} data 
 * @returns any[]
 */
export function getValue(data = []) {
    return data.map(item => item.value)
}

/**
 * Преобразует дату объектов
 * 
 * @param {any[]} result 
 * @returns any[]
 */
export function prepareData(result) {
    return result.data.map(item => {
        item.date = item.timestamp.split('T')[0]

        return item
    })
}
