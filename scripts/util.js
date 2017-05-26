/**************************************************
 * Created by nanyuantingfeng on 26/05/2017 18:18.
 **************************************************/
const path = require('path')
const execa = require('execa')

function getCWDPackageVersion () {
  let p = path.join(process.cwd(), 'package.json')
  let obj = require(p)
  if (obj && obj.version) {
    return obj.version
  }
  return null
}

function getAllTags () {
  return execa.shell('git tag -l')
}

function pushNewTag (tag) {
  return execa.shell(`git tag -a ${tag} -m '${tag}'`)
    .then(result => {
      if (result.failed) {
        return Promise.reject(new Error('push tag failed ...  try again'))
      }
      return execa.shell(`git push origin ${tag}`)
    })
}

function splitWith_N (str) {
  return str.split('\n')
}

function getBuildNo (v) {
  let s = v.split('.')
  return Number(s[3])
}

function compareUnit (a, b) {
  return getBuildNo(b) - getBuildNo(a)
}

function searchUseVersion (tags, version, isProduction) {
  return isProduction
    ? searchUseVersionProd(tags, version)
    : searchUseVersionBeta(tags, version)
}

function searchUseVersionBeta (tags, version) {
  return tags
    .filter(line => !~line.indexOf('-'))
    .filter(line => line.slice(1).startsWith(version))
    .sort(compareUnit)
}

function searchUseVersionProd (tags, version) {
  return tags
    .filter(line => !~line.indexOf('-'))
    .filter(line => line.startsWith(version))
    .sort(compareUnit)
}

exports.getCWDPackageVersion = getCWDPackageVersion
exports.getAllTags = getAllTags
exports.split = splitWith_N
exports.searchUseVersion = searchUseVersion
exports.getBuildNo = getBuildNo
exports.pushNewTag = pushNewTag
