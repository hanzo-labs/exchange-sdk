import time from './time'
import moment from 'moment'

test('time test', () => {
  let date = moment("2014-06-01T12:00:00Z");

  expect(time(date).format()).toBe('2014-06-01T05:00:00-07:00')
})

