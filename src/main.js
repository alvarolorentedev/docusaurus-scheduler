const core = require('@actions/core')
const fm = require('front-matter')
const fs = require('fs')
const path = require('path')

async function run() {
  try {
    const temporalFolder = core.getInput('base-folder', { required: true })
    const destinationFolder = core.getInput('destination-folder', {
      required: true
    })
    const baseFolderPath = path.join(
      process.env.GITHUB_WORKSPACE,
      temporalFolder
    )
    fs.readdirSync(baseFolderPath).forEach(file => {
      const baseFilePath = path.join(baseFolderPath, file)
      fs.readFile(baseFilePath, 'utf8', function (err, data) {
        if (err) throw err
        const { attributes } = fm(data)

        const destinationFilePath = path.join(
          process.env.GITHUB_WORKSPACE,
          destinationFolder,
          file
        )
        if (
          !attributes ||
          attributes.draft ||
          attributes.published > Date.now()
        ) {
          console.log(
            `${file}:not  moved from ${baseFilePath} to ${destinationFilePath}`
          )
          console.log(
            `${file}: not moved (draft -> ${attributes.draft}, future -> ${attributes.published > Date.now()})`
          )
          return
        }
        fs.renameSync(baseFilePath, destinationFilePath)
        console.log(
          `${file}: moved from ${baseFilePath} to ${destinationFilePath}`
        )
      })
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
