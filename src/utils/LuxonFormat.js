import {DateTime} from 'luxon'

const formatDate = (date) => {
    const humanRedableDate = DateTime.fromISO(date)
    return humanRedableDate.toFormat('dd.MM.yyyy')
}

export default formatDate