import _ from 'lodash'
import fs from 'fs'
import path from 'path'

const genDiff = (filePath1, filePath2) => {
  const absolutePath1 = path.resolve(filePath1)
  const absolutePath2 = path.resolve(filePath2)

  const content1 = fs.readFileSync(absolutePath1, 'utf-8')
  const content2 = fs.readFileSync(absolutePath2, 'utf-8')

  const data1 = JSON.parse(content1)
  const data2 = JSON.parse(content2)

  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const sortedKeys = _.sortBy(_.union(keys1, keys2))

  const lines = sortedKeys.flatMap((key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return `  + ${key}: ${data2[key]}`
    }
    if (data1[key] !== data2[key]) {
      return [
        `  - ${key}: ${data1[key]}`,
        `  + ${key}: ${data2[key]}`,
      ]
    }
    return `    ${key}: ${data1[key]}`
  })

  return ['{', ...lines, '}'].join('\n')
}

export default genDiff
