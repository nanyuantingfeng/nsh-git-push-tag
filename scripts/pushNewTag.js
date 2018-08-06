/**************************************************
 * Created by nanyuantingfeng on 2018/8/6 11:52.
 **************************************************/

const execa = require('execa');

module.exports = async function pushNewTag(tag) {
  const result = await execa.shell(`git tag -a ${tag} -m '${tag}'`);

  if (result.failed) {
    return Promise.reject(new Error('push tag failed ...  try again'));
  }

  return execa.shell(`git push origin ${tag}`);
};
