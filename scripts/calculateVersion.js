/**************************************************
 * Created by nanyuantingfeng on 2018/8/6 10:40.
 **************************************************/
const util = require('./util');

module.exports = function calculateVersion(program, tagsText, version) {
  const tagsO = util.split(tagsText);

  const tags = util.searchUseVersion(tagsO, version,
    program.isProduction,
    program.isNoBeta,
    program.isMinio,
  );

  let buildNo = 0;

  if (tags.length > 0) {
    buildNo = util.getBuildNo(tags[0]);
    buildNo += 1;
  }

  let p = program.isProduction ? '' : 'v';
  let n = program.isNoBeta ? '-noBeta' : '';
  let m = program.isMinio ? '-minio' : '';
  let s = program.suffix ? '-' + program.suffix : '';

  return p + version + '.' + buildNo + n + m + s;
};
