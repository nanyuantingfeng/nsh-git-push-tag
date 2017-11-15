/**************************************************
 * Created by nanyuantingfeng on 26/05/2017 18:05.
 **************************************************/
const program = require('commander')
const util = require('./util')
const version = require('../package.json').version;

program.version(version)
  .option('-p, --isproduction', 'Production Version')
  .option('-n, --noBeta', 'Privatisation Version')
  .option('-s, --suffix [value]', 'Append Tag Suffix')
  .parse(process.argv)

util.getAllTags()

  .then(result => {
    let version = util.getCWDPackageVersion()
    let tags = util.split(result.stdout)

    tags = util.searchUseVersion(tags, version, program.isproduction, program.noBeta)

    let buildNo = 0
    if (tags.length > 0) {
      buildNo = util.getBuildNo(tags[0])
      buildNo += 1
    }

    let prefix = program.isproduction ? '' : 'v'
    let nobeta = program.noBeta ? '-noBeta' : ''
    let suffix = program.suffix ? '-' + program.suffix : ''
    return prefix + version + '.' + buildNo + nobeta + suffix
  })

  .then(tag => {
    console.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', tag)
    return util.pushNewTag(tag)
  })

  .catch(e => {
    console.error(e)
  })
 
