/**************************************************
 * Created by nanyuantingfeng on 2018/8/6 11:57.
 **************************************************/
const util = require('../util');
const getCWDPackageVersion = require('../getCWDPackageVersion');
const getAllTags = require('../getAllTags');
const tagsText = require('./__tags');
const tagsArr = util.split(tagsText);

test('getCWDPackageVersion', () => {
  const version = getCWDPackageVersion();
  expect(version).toEqual('1.8.1');
});

test('getAllTags', async () => {
  const resp = await getAllTags();
  const result = util.split(resp);
  expect(result).toEqual(['1.8.0.0-noBeta-minio', 'v1.1.2.0']);
});

test('searchUseVersion', () => {

  let result = util.searchUseVersion(tagsArr, '4.15.0', false, false);
  expect(result.length).toEqual(93);

  result = util.searchUseVersion(tagsArr, '4.0.0', false, true);
  expect(result).toEqual([]);

  result = util.searchUseVersion(tagsArr, '4.0.0', false, false);
  expect(result.length).toEqual(113);

  result = util.searchUseVersion(tagsArr, '4.0.0', false, false, true);
  expect(result).toEqual([]);

  result = util.searchUseVersion(tagsArr, '4.170', false, false, true);
  expect(result).toEqual(['v4.170.83.13-minio', 'v4.170.84.13-minio', 'v4.170.3.11-minio', 'v4.170.3.1-minio']);

  result = util.searchUseVersion(tagsArr, '4.150', false, true, true);
  expect(result).toEqual(['v4.150.3.1-noBeta-minio']);

  result = util.searchUseVersion(tagsArr, '4.150', true, true, true);
  expect(result).toEqual(['4.150.3.199-noBeta-minio']);

});

test('getBuildNo@0', () => {
  expect(util.getBuildNo('v18.999.00.0')).toEqual(0);
  expect(util.getBuildNo('v18.999.00.199')).toEqual(199);
  expect(util.getBuildNo('v18.999.00-beta.199')).toEqual(0);
  expect(util.getBuildNo('v18.999.00-beta.199.2')).toEqual(2);
  expect(util.getBuildNo('v18.999.00-beta.199.2990')).toEqual(2990);
});

test('getBuildNo@1', () => {

  let result = util.searchUseVersion(tagsArr, '4.170', false, false, true);
  expect(result).toEqual(['v4.170.83.13-minio', 'v4.170.84.13-minio', 'v4.170.3.11-minio', 'v4.170.3.1-minio']);

  let buildNo = 0;
  if (result.length > 0) {
    buildNo = util.getBuildNo(result[0]);
    buildNo += 1;
  }

  expect(buildNo).toEqual(14);
});

test('getBuildNo@2', () => {

  let result = util.searchUseVersion(tagsArr, '4.150.3', false, true, true);
  expect(result).toEqual(['v4.150.3.1-noBeta-minio']);

  let buildNo = 0;
  if (result.length > 0) {
    buildNo = util.getBuildNo(result[0]);
    buildNo += 1;
  }
  expect(buildNo).toEqual(2);
});

