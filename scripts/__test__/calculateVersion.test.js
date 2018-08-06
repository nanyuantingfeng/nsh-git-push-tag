/**************************************************
 * Created by nanyuantingfeng on 2018/8/6 10:33.
 **************************************************/
const calculateVersion = require('../calculateVersion');
const tagsText = require('./__tags');

test('should calculateVersion', async () => {
  let tag;

  tag = calculateVersion({
    isProduction: false,
    isNoBeta: false,
    isMinio: false,
  }, tagsText, '4.0.0');

  expect(tag).toEqual('v4.0.0.114');

  tag = calculateVersion({
    isProduction: true,
    isNoBeta: false,
    isMinio: false,
  }, tagsText, '1.8.1.0');
  expect(tag).toEqual('1.8.1.0.0');

  tag = calculateVersion({
    isProduction: false,
    isNoBeta: true,
    isMinio: false,
  }, tagsText, '4.8.2');
  expect(tag).toEqual('v4.8.2.1-noBeta');

  tag = calculateVersion({
    isProduction: false,
    isNoBeta: false,
    isMinio: true,
  }, tagsText, '4.54.0');
  expect(tag).toEqual('v4.54.0.2-minio');

  tag = calculateVersion({
    isProduction: true,
    isNoBeta: true,
    isMinio: false,
  }, tagsText, '4.32.88');
  expect(tag).toEqual('4.32.88.2-noBeta');

  tag = calculateVersion({
    isProduction: true,
    isNoBeta: false,
    isMinio: true,
  }, tagsText, '4.333.90');
  expect(tag).toEqual('4.333.90.0-minio');

  tag = calculateVersion({
    isProduction: false,
    isNoBeta: true,
    isMinio: true,
  }, tagsText, '5.0.0');
  expect(tag).toEqual('v5.0.0.0-noBeta-minio');

  tag = calculateVersion({
    isProduction: true,
    isNoBeta: true,
    isMinio: true,
  }, tagsText, '4.64.78');
  expect(tag).toEqual('4.64.78.0-noBeta-minio');

});

test('should -beta.x', async () => {
  let tag;

  tag = calculateVersion({
    isProduction: true,
    isNoBeta: false,
    isMinio: false,
  }, tagsText, '5.0.0-beta.0');
  expect(tag).toEqual('5.0.0-beta.0.13');

  tag = calculateVersion({
    isProduction: false,
    isNoBeta: false,
    isMinio: false,
  }, tagsText, '5.0.0-beta.0');
  expect(tag).toEqual('v5.0.0-beta.0.8');
});
