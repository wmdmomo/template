const { exec } = require('shelljs')
const logger = require('../lib/logger')

logger.info('pull from remote')
if (exec('git pull --ff-only').code) {
  logger.fatal('git pull failed')
}

logger.info('clean dist')
if (exec('npm run clean -s').code) {
  logger.fatal('dist clean failed')
}

logger.info('build')
if (exec('npm run build -s').code) {
  logger.fatal('webpack build failed')
}

logger.info('add to stage')
if (exec('git add .').code) {
  logger.fatal('git add all failed')
}

logger.info('commit build')
if (exec('git commit -m "build"').code) {
  logger.fatal('git commit failed')
}

logger.info('update version')
if (exec('npm version minor -s').code) {
  logger.fatal('npm version failed')
}

logger.info('push commits to remote')
if (exec('git push').code) {
  logger.fatal('git push failed')
}

logger.info('push tags to remote')
if (exec('git push --tags').code) {
  logger.fatal('git push --tags failed')
}

logger.success('release success!')
