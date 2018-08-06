/**************************************************
 * Created by nanyuantingfeng on 26/05/2017 18:05.
 **************************************************/
const util = require('./util');

const calculateVersion = require('./calculateVersion');
const getCWDPackageVersion = require('./getCWDPackageVersion');
const getAllTags = require('./getAllTags');
const pushNewTag = require('./pushNewTag');

module.exports = async function tags(program) {
  try {
    const result = await getAllTags();
    const version = getCWDPackageVersion();
    const tag = calculateVersion(program, result, version);
    console.info('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', tag);
    return pushNewTag(tag);
  } catch (e) {
    console.error(e);
  }
};
