export function quantile(arr, q) {
    const sorted = arr.sort((a, b) => a - b)
    const pos = (sorted.length - 1) * q
    const base = Math.floor(pos)
    const rest = pos - base

    if (sorted[base + 1] !== undefined) {
        return Math.floor(sorted[base] + rest * (sorted[base + 1] - sorted[base]))
    } else {
        return Math.floor(sorted[base])
    }
}

export function printQuantile(data, date = '', name = '') {
    if (date || name) {
        console.log(`${date} ${name}: `)
    }

    if (!data || !data.length) {
        console.log('Нет данных')
        return
    }

    console.log(
        `p25=${quantile(data, 0.25)} p50=${quantile(data, 0.5)} ` +
        `p75=${quantile(data, 0.75)} p90=${quantile(data, 0.95)} ` +
        `hits=${data.length}`
    )
}