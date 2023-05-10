const { build: viteBuild, createLogger } = require('vite')
const path = require('path')

const ROOT = path.resolve(__dirname, '../')

const logger = createLogger('info', {
  prefix: '[build]',
})

const loggerInfo = logger.info
logger.info = (msg, options) => loggerInfo(msg, { timestamp: true, ...options })

async function build() {
  await buildMain()
  await buildRenderer(path.join(ROOT, 'src/renderer/vite.config.ts'))
}

async function buildMain() {
  await viteBuild({
    configFile: path.join(ROOT, 'src/main/vite.config.ts'),
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
