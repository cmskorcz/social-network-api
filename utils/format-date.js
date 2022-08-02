const moment = require('moment')

const formatDate = (date) => {
    return moment(date).format('MMMM Do, YYYY')
}

module.exports = formatDate;