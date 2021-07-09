function quantile(arr, q) {
    const sorted = arr.sort((a, b) => a - b);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;

    if (sorted[base + 1] !== undefined) {
        return Math.floor(sorted[base] + rest * (sorted[base + 1] - sorted[base]));
    } else {
        return Math.floor(sorted[base]);
    }
};

function printQuantile(data, date = '', name = '') {
    if (date || name) {
        console.log(`${date} ${name}: `)
    }

    if (!data || !data.length) {
        console.log('No data')
        return
    }

    console.log(
        `p25=${quantile(data, 0.25)} p50=${quantile(data, 0.5)} ` +
        `p75=${quantile(data, 0.75)} p90=${quantile(data, 0.95)} ` +
        `hits=${data.length}`
    );
}

function prepareData(result) {
    return result.data.map(item => {
        item.date = item.timestamp.split('T')[0];

        return item;
    });
}

// показать значение метрики за несколько дней ✅
function showMetricByPeriod(data, startDate, endDate) {
    const startTime = new Date(startDate).getTime()
    const endTime = new Date(endDate).getTime()

    const result = data.filter(item => {
        const time = new Date(item.date).getTime()
        return time >= startTime && time <= endTime
    })

    console.log(`Metrics from ${startDate} to ${endDate}`)
    console.log(result)
    return result
}

// показать сессию пользователя ✅
function showSession(data, requestId) {
    const result = data.filter(item => item.requestId === requestId)
    console.log(`User ${requestId}`)
    console.log(result)
    return result
}

// Посчитать пользователей за определённую дату
function countUsersByDate(data, date) {
    const result = new Set(
        data.filter(item => item.date == date)
            .map(item => item.requestId)
    )

    console.log(`Users for ${date}: ${result.size}`)
    return result
}

// сравнить метрику в разных срезах ✅
function compareMetric(metric1, metric2) {
    console.log('Compare metrics')

    console.log(metric1.name)
    printQuantile(metric1.data)

    console.log(metric2.name)
    printQuantile(metric2.data)
}

// Разделить пользователей на тёмных и светлых 🧑🧑🏿
// Срез по теме сайта
function getUsersWithDifferentThemes(data = []) {
    const withDarkTheme = data.filter(item => item.additional.darkTheme)
    const withLightTheme = data.filter(item => !item.additional.darkTheme)

    return {
        withDarkTheme,
        withLightTheme
    }
}

// рассчитать метрику за выбранный день
function calcMetricByDate(data, page, name, date) {
    const sampleData = data
        .filter(item => item.page == page && item.name == name && item.date == date)
        .map(item => item.value);

    printQuantile(sampleData, date, name)
    return sampleData
}

// получить определённую метрику
function getMetric(data, page, name) {
    const sampleData = data
        .filter(item => item.page == page && item.name == name);

    return sampleData
}

// Получить значение из массива
function getValue(data = []) {
    return data.map(item => item.value)
}

fetch('https://shri.yandex/hw/stat/data?counterId=8B6B7D2D-BAAF-44B9-A2FB-0DEB94754714')
    .then(res => res.json())
    .then(result => {
        const data = prepareData(result);

        calcMetricByDate(data, 'Weather view page', 'connect', '2021-07-09');
        calcMetricByDate(data, 'Weather view page', 'forecastsViewed', '2021-07-09');
        calcMetricByDate(data, 'Weather view page', 'userOnSiteTime', '2021-07-09');

        const byPeriod = showMetricByPeriod(data, '2021-07-08', '2021-07-09')
        showSession(data, '789595893387')
        countUsersByDate(data, '2021-07-09')

        const usersWithDiffThemes = getUsersWithDifferentThemes(
            getMetric(byPeriod, 'Weather view page', 'userOnSiteTime')
        )
        console.log('Время людей на сайте в зависимости от темы, тёмной и светлой.')
        compareMetric(
            { name: 'Тёмная тема', data: getValue(usersWithDiffThemes.withDarkTheme) },
            { name: 'Светлая тема', data: getValue(usersWithDiffThemes.withLightTheme) }
        )
    });
