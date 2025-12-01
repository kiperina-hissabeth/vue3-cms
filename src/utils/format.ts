import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC(
  utcstring: string,
  format: string = 'YYYY/MM/DD HH:mm:ss'
) {
  const resultTime = dayjs.utc(utcstring).utcOffset(8).format(format)
  return resultTime
}
