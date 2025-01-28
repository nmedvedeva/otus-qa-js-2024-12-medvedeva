import { nameIsValid, fullTrim, getTotal } from '../src/app'

describe('nameIsValid', () => {
  test('Функция импортируется без ошибок', () => {
    expect(nameIsValid).toBeDefined()
    expect(typeof nameIsValid).toBe('function')
  })
  test('Проверка на ввод корректного имени', () => {
    expect(nameIsValid('john')).toBe(true)
  })

  test('Проверка на ввод имени < 2 символов', () => {
    expect(nameIsValid('a')).toBe(false)
  })

  test('Проверка на ввод имени с недопустимыми символами', () => {
    expect(nameIsValid('john123')).toBe(false)
  })

  test('Проверка на ввод имени с нестроковым значением', () => {
    expect(nameIsValid(123)).toBe(false)
  })

  test('Проверка на ввод имени с пустой строкой', () => {
    expect(nameIsValid('')).toBe(false)
  })
})

describe('fullTrim', () => {
  test('Функция импортируется без ошибок', () => {
    expect(fullTrim).toBeDefined()
    expect(typeof fullTrim).toBe('function')
  })
  test('Удаление пробелов в начале и конце строки', () => {
    expect(fullTrim('  hello  ')).toBe('hello')
  })

  test('Удаление пробелов внутри слова', () => {
    expect(fullTrim(' h e l l o ')).toBe('hello')
  })

  test('Возврат пустой строки для пустой строки', () => {
    expect(fullTrim('')).toBe('')
  })

  test('Возврат пустой строки для undefined', () => {
    expect(fullTrim(undefined)).toBe('')
  })

  test('Возврат пустой строки для null', () => {
    expect(fullTrim(null)).toBe('')
  })
})

describe('getTotal', () => {
  test('Функция импортируется без ошибок', () => {
    expect(getTotal).toBeDefined()
    expect(typeof getTotal).toBe('function')
  })
  test('Возврат 0 при пустом массиве', () => {
    expect(getTotal()).toBe(0)
  })

  test('Отображение общей суммы, если скидка не указана', () => {
    expect(getTotal([{ price: 10, quantity: 10 }])).toBe(100)
  })

  test('Отображение общей суммы с примененной скидкой', () => {
    expect(getTotal([{ price: 10, quantity: 10 }], 10)).toBe(90)
  })

  test('должен выбросить ошибку, если скидка не число', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], 'not-a-number')).toThrow('Скидка должна быть числом')
  })

  test('Ошибка, если процент скидки меньше 0', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], -5)).toThrow('Процент скидки должен быть от 0 до 99')
  })

  test('Ошибка, если процент скидки больше или равен 100', () => {
    expect(() => getTotal([{ price: 10, quantity: 10 }], 100)).toThrow('Процент скидки должен быть от 0 до 99')
  })

  const table = [
    [
      'Корректный рассчёт для нескольких товаров: [10, 1] и [20, 2]',
      [
        { price: 10, quantity: 1 },
        { price: 20, quantity: 2 }
      ],
      10,
      45
    ]
  ];

  test.each(table)('%s', (name, items, discount, expectedTotal) => {
    expect(getTotal(items, discount)).toBe(expectedTotal);
  });
})
