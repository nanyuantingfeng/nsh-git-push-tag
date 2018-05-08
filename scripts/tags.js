/**************************************************
 * Created by nanyuantingfeng on 26/05/2017 18:05.
 **************************************************/
const util = require('./util')

function calculateVersion(program) {
  return util.getAllTags()

    .then(result => {
      let version = util.getCWDPackageVersion()
      let tags = util.split(result.stdout)

      tags = util.searchUseVersion(tags, version,
        program.isProduction,
        program.isNoBeta,
        program.isMinio,
      )

      let buildNo = 0

      if (tags.length > 0) {
        buildNo = util.getBuildNo(tags[0])
        buildNo += 1
      }

      let p = program.isProduction ? '' : 'v'
      let n = program.isNoBeta ? '-noBeta' : ''
      let m = program.isMinio ? '-minio' : ''
      let s = program.suffix ? '-' + program.suffix : ''

      return p + version + '.' + buildNo + n + m + s
    })
}

function tags(program) {

  return calculateVersion(program)
    .then(tag => {
      console.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', tag)
      return util.pushNewTag(tag)
    }).catch(e => {
      console.error(e)
    })
}

tags.calculateVersion = calculateVersion

module.exports = tags

