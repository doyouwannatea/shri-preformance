/**
 * Разделить пользователей на тёмных и светлых 🧑🧑🏿
 * Срез по теме сайта
 * 
 * @param {any[]} data 
 * @returns { {withDarkTheme: any[], withLightTheme: any[]} } - users with different themes
 */
export function getUsersWithDifferentThemes(data = []) {
    return data.reduce((acc, curr) => {
        if (curr.additional.darkTheme) {
            acc.withDarkTheme.push(curr)
        } else {
            acc.withLightTheme.push(curr)
        }

        return acc
    }, { withDarkTheme: [], withLightTheme: [] })
}