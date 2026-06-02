import _ from 'lodash'

const genDiff = (data1, data2) => {
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
