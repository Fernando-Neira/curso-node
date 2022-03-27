const path = require('path')
const { v4: uuid4 } = require('uuid')

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

  return new Promise((resolve, reject) => {

    const { file } = files

    const splittedName = file.name.split('.')
    const extension = splittedName[splittedName.length - 1]

    if (!validExtensions.includes(extension)) {
      return reject(`Extensión ${extension} no esta permitida`)
    }

    const filenameTmp = uuid4() + '.' + extension
    const uploadPath = path.join(__dirname, '../uploads/', folder, filenameTmp)

    file.mv(uploadPath, (err) => {
      if (err) {
        console.error(err)
        return reject(err)
      }

      resolve({filename, path: uploadPath})
    })
  })
}

module.exports = {
  uploadFile
}
