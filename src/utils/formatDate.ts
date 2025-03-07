// 날짜포맷
import dayjs from 'dayjs'

const formatDate = (isoDate: string) => {
  return dayjs(isoDate).format('YY.MM.DD')
}

export default formatDate
