import { DateTime } from 'luxon'

const FORMAT = DateTime.DATETIME_SHORT

const formatDateTime = (date) => {
  return date ? new Date(date).toLocaleString(FORMAT) : null
}

const toRelative = (date) => {
  return DateTime.fromISO(date).toRelative()
}

const DateUtil = {
  formatDateTime,
  toRelative
}

export default DateUtil
