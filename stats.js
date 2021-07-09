import { calcMetricByDate, compareMetric, getMetric, showMetricByPeriod } from './helpers/metric.js'
import { getValue, prepareData } from './helpers/prepareData.js'
import { countUsersByDate, showSession } from './helpers/user.js'
import { getUsersWithDifferentThemes } from './slices/theme.js'

fetch('https://shri.yandex/hw/stat/data?counterId=8B6B7D2D-BAAF-44B9-A2FB-0DEB94754714')
    .then(res => res.json())
    .then(result => {
        const data = prepareData(result)

        calcMetricByDate(data, 'Weather view page', 'connect', '2021-07-09')
        calcMetricByDate(data, 'Weather view page', 'forecastsViewed', '2021-07-09')
        calcMetricByDate(data, 'Weather view page', 'userOnSiteTime', '2021-07-09')
        showSession(data, '789595893387')
        countUsersByDate(data, '2021-07-09')

        const byPeriod = showMetricByPeriod(data, '2021-07-08', '2021-07-10')
        const { withDarkTheme, withLightTheme } = getUsersWithDifferentThemes(byPeriod)

        compareMetric(
            'Время людей на сайте в зависимости от цветовой темы.',
            {
                name: 'Тёмная тема',
                data: getValue(
                    getMetric(withDarkTheme, 'Weather view page', 'userOnSiteTime')
                )
            },
            {
                name: 'Светлая тема',
                data: getValue(
                    getMetric(withLightTheme, 'Weather view page', 'userOnSiteTime')
                )
            }
        )

        compareMetric(
            'Сколько погоды просмотрено в зависимости от цветовой темы.',
            {
                name: 'Погоды просмотрено с тёмной темой',
                data: getValue(
                    getMetric(withDarkTheme, 'Weather view page', 'forecastsViewed')
                )
            },
            {
                name: 'Погоды просмотрено со светлой темой',
                data: getValue(
                    getMetric(withLightTheme, 'Weather view page', 'forecastsViewed')
                )
            }
        )
    })
