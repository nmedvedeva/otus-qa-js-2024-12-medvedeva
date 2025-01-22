function kolobok(who) {
    switch (who) {
      case 'дедушка':
        return 'Я от дедушки ушёл'
      case 'заяц':
        return 'Я от зайца ушёл'
      case 'лиса':
        return 'Меня съели'
      default:
        return 'Я такого не встречал'
    }
}

console.log(kolobok("лиса"))

function newYear(name) {
    if (name == "Дед Мороз" || name == "Снегурочка")
        return `${name}! `.repeat(3)
}

console.log(newYear("Дед Мороз"))