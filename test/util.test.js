/**************************************************
 * Created by kaili on 2017/11/10 上午11:13.
 **************************************************/
const util = require('../scripts/util')
const tags = require('../scripts/tags')

test('tags', async () => {
  let tag
  tag = await tags.calculateVersion({
    isProduction: false,
    isNoBeta: false,
    isMinio: false,
  })
  expect(tag).toEqual('v1.8.1.0')

  tag = await tags.calculateVersion({
    isProduction: true,
    isNoBeta: false,
    isMinio: false,
  })

  expect(tag).toEqual('1.8.1.0')

  tag = await tags.calculateVersion({
    isProduction: false,
    isNoBeta: true,
    isMinio: false,
  })

  expect(tag).toEqual('v1.8.1.0-noBeta')

  tag = await tags.calculateVersion({
    isProduction: false,
    isNoBeta: false,
    isMinio: true,
  })

  expect(tag).toEqual('v1.8.1.0-minio')

  tag = await tags.calculateVersion({
    isProduction: true,
    isNoBeta: true,
    isMinio: false,
  })

  expect(tag).toEqual('1.8.1.0-noBeta')

  tag = await tags.calculateVersion({
    isProduction: true,
    isNoBeta: false,
    isMinio: true,
  })

  expect(tag).toEqual('1.8.1.0-minio')

  tag = await tags.calculateVersion({
    isProduction: false,
    isNoBeta: true,
    isMinio: true,
  })

  expect(tag).toEqual('v1.8.1.0-noBeta-minio')

  tag = await tags.calculateVersion({
    isProduction: true,
    isNoBeta: true,
    isMinio: true,
  })

  expect(tag).toEqual('1.8.1.0-noBeta-minio')
})

test('getCWDPackageVersion', () => {
  let version = util.getCWDPackageVersion()
  expect(version).toEqual('1.8.1')
})

test('getAllTags', () => {
  return util.getAllTags().then(resp => {
    let result = util.split(resp.stdout)
    expect(result).toEqual(['v1.1.2.0'])
  })
})

test('searchUseVersion', () => {
  let dataSource = require('./tags.json')

  let result = util.searchUseVersion(dataSource, '4.15.0', false, false)
  expect(result).toEqual(['v4.15.0.87', 'v4.15.0.86', 'v4.15.0.5', 'v4.15.0.1', 'v4.15.0.0'])

  result = util.searchUseVersion(dataSource, '4.0.0', false, true)
  expect(result).toEqual(['v4.0.0.1-noBeta', 'v4.0.0.0-noBeta'])

  result = util.searchUseVersion(dataSource, '4.0.0', false, false)
  expect(result).toEqual(['v4.0.0.1', 'v4.0.0.0'])

  result = util.searchUseVersion(dataSource, '4.0.0', false, false, true)
  expect(result).toEqual([])

  result = util.searchUseVersion(dataSource, '4.170', false, false, true)
  expect(result).toEqual(['v4.170.83.13-minio', 'v4.170.3.1-minio'])

  result = util.searchUseVersion(dataSource, '4.150', false, true, true)
  expect(result).toEqual(['v4.150.3.1-noBeta-minio'])

})

test('getBuildNo@0', () => {
  expect(util.getBuildNo('v18.999.00.0')).toEqual(0)
})

test('getBuildNo@1', () => {
  let dataSource = require('./tags.json')

  let result = util.searchUseVersion(dataSource, '4.170', false, false, true)
  expect(result).toEqual(['v4.170.83.13-minio', 'v4.170.3.1-minio'])

  let buildNo = 0
  if (result.length > 0) {
    buildNo = util.getBuildNo(result[0])
    buildNo += 1
  }

  expect(buildNo).toEqual(14)
})

test('getBuildNo@2', () => {
  let dataSource = require('./tags.json')
  let result = util.searchUseVersion(dataSource, '4.150.3', false, true, true)
  expect(result).toEqual(['v4.150.3.1-noBeta-minio'])

  let buildNo = 0
  if (result.length > 0) {
    buildNo = util.getBuildNo(result[0])
    buildNo += 1
  }
  expect(buildNo).toEqual(2)

})
