import fs from 'fs'
import path from 'path'
import parse from './parsers.js'

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath)
const getFormat = (filepath) => path.extname(filepath).slice(1)
const generateDiff = (filePath1, filePath2) => {
    const fullPath1 = getAbsolutePath(filePath1)
    const fullPath2 = getAbsolutePath(filePath2)

    const data1 = fs.readFileSync(fullPath1, 'utf-8')
    const data2 = fs.readFileSync(fullPath2, 'utf-8')

    const obj1 = parse(data1, getFormat(filePath1))
    const obj2 = parse(data2, getFormat(filePath2))

    console.log('Parsed File 1:', obj1)
    console.log('Parsed File 2:', obj2)

    return ''
}

export default generateDiff
