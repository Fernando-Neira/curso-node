const allowedCollections = (collection = '', allowed = []) => {
  const isIncluded = allowed.includes(collection)
  if (!isIncluded) {
    throw new Error(`La colección ${collection} no esta permitida`)
  }

  return true
}

module.exports = {
  allowedCollections
}