export function kolobok(character) {
  switch (character) {
    case 'дедушка':
      return 'Я от дедушки ушёл'
    case 'заяц':
      return 'Я от зайца ушёл'
    case 'лиса':
      return 'Меня съели'
    default:
<<<<<<< HEAD
      throw new Error('Я встретил кого-то неизвестного')
=======
      return 'Я встретил кого-то неизвестного'
>>>>>>> a5c8759 (add tale.js)
  }
}

export function newYear(character) {
  switch (character) {
    case 'Дед Мороз':
    case 'Снегурочка':
      return `${character}! ${character}! ${character}!`
    default:
<<<<<<< HEAD
      throw new Error('Неизвестный персонаж')
=======
      return 'Неизвестный персонаж'
>>>>>>> a5c8759 (add tale.js)
  }
}
