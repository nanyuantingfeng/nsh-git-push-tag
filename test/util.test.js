/**************************************************
 * Created by kaili on 2017/11/10 上午11:13.
 **************************************************/
import util from '../scripts/util'

test('getCWDPackageVersion', () => {
  let version = util.getCWDPackageVersion()
  expect(version).toEqual('1.1.3')
})

test('getAllTags', () => {
  return util.getAllTags().then(resp => {
    let result = util.split(resp.stdout)
    expect(result).toEqual([
      '1.1.3.0',
      '1.1.3.1',
      '1.1.3.1-noBeta',
      'v1.1.2.0'
    ])
  })
})

test('searchUseVersion', () => {
  let dataSource = require('./tags.json')
  let result = util.searchUseVersion(dataSource, '4.0.0', false, true)
  expect(result).toEqual(['v4.0.0.1-noBeta', 'v4.0.0.0-noBeta'])

  result = util.searchUseVersion(dataSource, '4.0.0', false, false)
  expect(result).toEqual(['v4.0.0.1', 'v4.0.0.0'])
})

test('searchUseVersion', () => {
  let dataSource = require('./tags.json')
  let result = util.searchUseVersion(dataSource, '4.0.0', false, true)
  expect(result)
    .toEqual(['v4.0.0.1-noBeta', 'v4.0.0.0-noBeta'])

  let buildNo = 0
  if (result.length > 0) {
    buildNo = util.getBuildNo(result[0])
    buildNo += 1
  }
  expect(buildNo).toEqual(2)

  result = util.searchUseVersion(dataSource, '4.15.0', false, false)
  expect(result).toEqual(['v4.15.0.87', 'v4.15.0.86', 'v4.15.0.5', 'v4.15.0.1', 'v4.15.0.0'])
})

