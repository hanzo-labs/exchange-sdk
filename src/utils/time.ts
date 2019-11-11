import moment from 'moment-timezone'

/**
 * Initializes a moment.js object and converts it to Pacific time immediately so
 * unix time is always rendered correctly.
 */
export default function(...args: any[]): moment.Moment {
  return moment(...args).tz('America/Los_Angeles')
}

