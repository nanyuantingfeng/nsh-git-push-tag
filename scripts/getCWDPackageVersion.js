/**************************************************
 * Created by nanyuantingfeng on 2018/8/6 11:51.
 **************************************************/

const path = require('path');

module.exports = function getCWDPackageVersion() {
  const p = path.join(process.cwd(), 'package.json');
  const obj = require(p);

  if (obj && obj.version) {
    return obj.version;
  }

  return null;
};
