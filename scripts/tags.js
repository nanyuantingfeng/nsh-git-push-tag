/**************************************************
 * Created by nanyuantingfeng on 26/05/2017 18:05.
 **************************************************/
const program = require('commander')
const util = require('./util')

program.version('1.0.0')
  .option('-p, --isproduction', 'Production Version')
  .parse(process.argv)

util.getAllTags()

  .then(result => {
    let version = util.getCWDPackageVersion()
    let tags = util.split(result.stdout)

    tags = util.searchUseVersion(tags, version, program.isproduction)

    let buildNo = 0
    if (tags.length > 0) {
      buildNo = util.getBuildNo(tags[0])
      buildNo += 1
    }

    let prefix = program.isproduction ? '' : 'v'
    return prefix + version + '.' + buildNo
  })

  .then(tag => {
    console.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', tag)
    return util.pushNewTag(tag)
  })

  .catch(e => {
    console.error(e)
  })
 
