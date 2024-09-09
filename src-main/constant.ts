import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const APP_NAME = '轻音乐'

const __filename = fileURLToPath(import.meta.url)

export const ROOT = path.dirname(__filename)

export const DEV = import.meta.env.DEV || process.argv.includes('--dev')
