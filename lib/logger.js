const logSymbols = require('log-symbols')
const format = require('util').format

exports.log = function (...args) {
  const msg = format(...args)
  console.log(msg)
}

exports.fatal = function (...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(logSymbols.error, msg)
  process.exit(1)
}

exports.success = function (...args) {
  const msg = format(...args)
  console.log(logSymbols.success, msg)
}

exports.info = function (...args) {
  const msg = format(...args)
  console.log(logSymbols.info, msg)
}
