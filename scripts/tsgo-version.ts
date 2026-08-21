import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const filePath = path.resolve(
  import.meta.dirname,
  '../tsgo/tsc/internal/core/version.go',
)
const fileContent = await readFile(filePath, 'utf8')
const date = new Date().toISOString().split('T', 1)[0].replaceAll('-', '')
const newContent = fileContent.replaceAll('-dev', `-dev.${date}`)
await writeFile(filePath, newContent)
console.info(`Patched tsgo version to dev.${date}`)
