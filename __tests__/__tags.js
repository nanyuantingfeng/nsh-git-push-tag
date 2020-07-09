/**************************************************
 * Created by nanyuantingfeng on 2018/8/6 11:59.
 **************************************************/
const fs = require('fs');
const path = require('path');
const str = fs.readFileSync(path.join(__dirname, 'tags.txt'));

module.exports = String(str);
