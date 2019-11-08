import moment from 'moment-timezone'

export default function(...args: any[]): moment.Moment {
  return moment(...args).tz('America/Los_Angeles')
}

