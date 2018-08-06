/**************************************************
 * Created by nanyuantingfeng on 26/05/2017 18:05.
 **************************************************/
const util = require('./util');

const calculateVersion = require('./calculateVersion');

module.exports = async function tags(program) {
  try {
    const result = await util.getAllTags();
    const version = util.getCWDPackageVersion();
    const tag = calculateVersion(program, result, version);
    console.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', tag);
    return util.pushNewTag(tag);

  } catch (e) {
    console.error(e);
  }
};
