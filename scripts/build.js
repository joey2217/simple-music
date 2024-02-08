/*eslint-env node*/
import { build as viteBuild, createLogger } from 'vite'
import { join } from 'node:path'

const ROOT = process.cwd()

const logger = createLogger('info', {
  prefix: '[build]',
})

const loggerInfo = logger.info
logger.info = (msg, options) => loggerInfo(msg, { timestamp: true, ...options })

async function build() {
  await buildMain()
  await buildRenderer(join(ROOT, 'src/renderer/vite.config.ts'))
}

async function buildMain() {
  await viteBuild({
    configFile: join(ROOT, 'src/main/vite.config.ts'),
    mode: 'production',
  })
  logger.info('build main success!')
}

async function buildRenderer(configFile) {
  await viteBuild({
    configFile,
    mode: 'production',
  })
  logger.info('build renderer success!')
}

build()
