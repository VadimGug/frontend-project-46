import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

test('compare flat json files', () => {
  const path1 = getFixturePath('file1.json')
  const path2 = getFixturePath('file2.json')

  const expected = '...'

  expect(genDiff(path1, path2)).toEqual(expected)
})
