import { execSync } from 'node:child_process'
import { copyFile, cp, glob, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = path.dirname(import.meta.dirname)

await writePublishVersion()
await copyArtifacts()

async function writePublishVersion() {
  const date = new Date()
  let version = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
  if (process.env.TEST_RELEASE === 'true') {
    version += `-${date.getHours()}.${date.getMinutes()}`
  }
  console.info('current version:', version)

  const tsgoCommit = execSync('git rev-parse HEAD', {
    encoding: 'utf8',
    cwd: path.resolve(import.meta.dirname, '../tsgo'),
  }).trim()
  console.info('tsgo commit:', tsgoCommit)

  console.log({ root })
  for await (const file of glob('packages/*/package.json', {
    cwd: root,
  })) {
    const filePath = path.resolve(root, file)
    const fileContent = await readFile(filePath, 'utf8')
    const json = JSON.parse(fileContent)

    json.version = version
    json.buildInfo = {
      date: date.toISOString().split('T', 1)[0],
      commit: tsgoCommit,
    }

    const newContent = JSON.stringify(json, null, 2)
    await writeFile(filePath, `${newContent}\n`)
    console.info(`Updated version in ${filePath} to ${version}`)

    const pkgPath = path.dirname(file)
    await cp(
      path.resolve(root, 'README.md'),
      path.resolve(pkgPath, 'README.md'),
    )
    await cp(path.resolve(root, 'LICENSE'), path.resolve(pkgPath, 'LICENSE'))
  }
}

async function copyArtifacts() {
  const artifactsFile = path.resolve(
    import.meta.dirname,
    '../dist/artifacts.json',
  )
  const artifacts = (await import(artifactsFile, { with: { type: 'json' } }))
    .default
  for (const artifact of artifacts) {
    if (artifact.type !== 'Binary') continue

    const packageFolder = path.resolve(
      import.meta.dirname,
      '../packages',
      artifact.goarch === 'wasm'
        ? 'wasm'
        : `${artifact.goos}-${artifact.goarch}`,
    )
    const binFile =
      artifact.goarch === 'wasm'
        ? 'tsgo.wasm'
        : artifact.goos === 'windows'
          ? 'tsgo.exe'
          : 'tsgo'
    const src = path.resolve(import.meta.dirname, '..', artifact.path)
    const dest = path.resolve(packageFolder, binFile)
    await copyFile(src, dest)

    if (artifact.goarch !== 'wasm') {
      await cp('tsgo/built/local', packageFolder, { recursive: true })
    }
  }
}
