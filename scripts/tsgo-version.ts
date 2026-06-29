import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const filePath = path.resolve(
  import.meta.dirname,
  '../tsgo/internal/core/version.go',
)
const fileContent = await readFile(filePath, 'utf8')
const date = new Date().toISOString().split('T', 1)[0].replaceAll('-', '')
const newContent = fileContent.replaceAll('7.0.0-dev', `7.0.0-dev.${date}`)
await writeFile(filePath, newContent)
console.info(`Patched tsgo version to 7.0.0-dev.${date}`)
