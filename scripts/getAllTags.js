/**************************************************
 * Created by nanyuantingfeng on 2018/8/6 11:52.
 **************************************************/
const execa = require('execa');

module.exports = async function getAllTags() {
  await execa.shell('git fetch');
  const oo = await execa.shell('git tag -l');
  return oo.stdout;
};
