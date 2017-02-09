#!/usr/bin/env node
/**************************************************
 * Created by nanyuantingfeng on 09/02/2017 14:48.
 **************************************************/
const execa = require('execa');

execa.shell('git describe --tags `git rev-list --tags --max-count=1`')
  .then(result => {
    console.log("current last tag is :", result.stdout);
    const lastTag = result.stdout;
    const tbs = lastTag.split(".");
    tbs.push(Number(tbs.pop()) + 1);
    const newTag = tbs.join(".");
    console.log("git push origin :", newTag);
    return newTag
  }).then(tag => {
  return execa.shell('git push origin ' + tag)
}).then(result => {
  console.log(result.stdout);
}); 

