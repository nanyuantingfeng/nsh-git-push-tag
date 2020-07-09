/**************************************************
 * Created by nanyuantingfeng on 26/05/2017 18:05.
 **************************************************/
const calculateVersion = require("./calculateVersion");
const getCWDPackageVersion = require("./getCWDPackageVersion");
const getFileVersion = require("./getFileVersion");
const getAllTags = require("./getAllTags");
const pushNewTag = require("./pushNewTag");

module.exports = async function tags(program) {
  try {
    const result = await getAllTags();
    const isFromFile = !!program.file;
    const version = isFromFile
      ? await getFileVersion(program.file)
      : getCWDPackageVersion();
    const tag = calculateVersion(program, result, version);
    console.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", tag);
    return pushNewTag(tag, program.comment);
  } catch (e) {
    console.error(e);
  }
};
