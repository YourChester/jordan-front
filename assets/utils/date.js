const getDateForInput = (data) => {
  if (!data) {
    return ''
  }
  const day = new Date(data).getDate()
  const month =
    new Date(data).getMonth() + 1 < 10
      ? `0${new Date(data).getMonth() + 1}`
      : new Date(data).getMonth() + 1
  const year = new Date(data).getFullYear()
  return `${year}-${month}-${day}`
}

const getDateTimeForInput = (data) => {
  if (!data) {
    return ''
  }
  const day =
    new Date(data).getDate() < 10
      ? `0${new Date(data).getDate()}`
      : new Date(data).getDate()
  const month =
    new Date(data).getMonth() + 1 < 10
      ? `0${new Date(data).getMonth() + 1}`
      : new Date(data).getMonth() + 1
  const year = new Date(data).getFullYear()
  const hours =
    new Date(data).getHours() < 10
      ? `0${new Date(data).getHours()}`
      : new Date(data).getHours()
  const minutes =
    new Date(data).getMinutes() < 10
      ? `0${new Date(data).getMinutes()}`
      : new Date(data).getMinutes()

  return `${year}-${month}-${day}T${hours}:${minutes}:00`
}

const getDateWithTime = (data) => {
  if (!data) {
    return ''
  }
  const day =
    new Date(data).getDate() < 10
      ? `0${new Date(data).getDate()}`
      : new Date(data).getDate()
  const month =
    new Date(data).getMonth() + 1 < 10
      ? `0${new Date(data).getMonth() + 1}`
      : new Date(data).getMonth() + 1
  const year = new Date(data).getFullYear()
  const hours =
    new Date(data).getHours() < 10
      ? `0${new Date(data).getHours()}`
      : new Date(data).getHours()
  const minutes =
    new Date(data).getMinutes() < 10
      ? `0${new Date(data).getMinutes()}`
      : new Date(data).getMinutes()

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

const getFormatedDate = (data) => {
  if (!data) {
    return ''
  }
  const day =
    new Date(data).getDate() < 10
      ? `0${new Date(data).getDate()}`
      : new Date(data).getDate()
  const month =
    new Date(data).getMonth() + 1 < 10
      ? `0${new Date(data).getMonth() + 1}`
      : new Date(data).getMonth() + 1
  const year = new Date(data).getFullYear()

  return `${day}.${month}.${year}`
}

const getMonthName = (index) => {
  const month = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябырь',
    'Декабырь',
  ]
  return month[index]
}

export {
  getDateForInput,
  getDateWithTime,
  getDateTimeForInput,
  getFormatedDate,
  getMonthName,
}
