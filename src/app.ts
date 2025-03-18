/**
 * Проверка имени пользователя
 * @param {string} name
 * @returns {boolean}
 */
export const nameIsValid = (name: string): boolean =>
  typeof name === 'string' && name.length >= 2 && /^[a-z]+$/.test(name)

/**
 * Удаление пробелов из строки
 *
 * @param {string} text
 * @returns {string}
 */
export const fullTrim = (text: string): string => (text ?? '').replace(/\s+/g, '')

/**
 * Подсчёт суммы заказа
 *
 * @param {[{quantity: number, name?: string, price: number}]} items
 * @param {number} discount
 * @returns {number}
 * @throws Вернёт ошибку, если скидка не число и больше 99 или меньше 0
 * @example getTotal([{ price: 10, quantity: 10 }]) // 100
 * @example getTotal([{ price: 10, quantity: 1 }]) // 10
 * @example getTotal([{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }]) // 100
 * @example getTotal([{ price: 10, quantity: 0 }], { price: 10, quantity: 9 }) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 10) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 100) // 0
 */
// @ts-expect-error: что-то с типами
export const getTotal = (items: [{ quantity: number; name?: string; price: number }] = [], discount = 0): number => {
  if (typeof discount !== 'number') {
    throw new Error('Скидка должна быть числом')
  }
  if (discount < 0 || discount >= 100) {
    throw new Error('Процент скидки должен быть от 0 до 99')
  }

  const total = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0)
  return total * (1 - discount / 100)
}

/**
 * Подсчёт суммы баллов успеваемости всех пользователей.
 *
 * @param {Object} scores - Объект, содержащий никнеймы пользователей и их баллы.
 * @returns {number} - Общий балл всех пользователей.
 *
 * @example
 * const scores = {
 *   Anna: 10,
 *   Olga: 1,
 *   Ivan: 5,
 * };
 * const totalScore = getScore(scores);
 * console.log(totalScore); // 16
 */
// @ts-expect-error: надо разобраться, что-то с типами
export function getScore(scores) {
  let totalScore = 0

  for (const nickname in scores) {
    if (typeof scores[nickname] === 'number') {
      totalScore += scores[nickname]
    }
  }

  return totalScore
}
