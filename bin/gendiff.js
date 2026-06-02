#!/usr/bin/env node

import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import genDiff from '../src/index.js'

const program = new Command()

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filePath1> <filePath2>')
  .action((filePath1, filePath2) => {
    const fullPath1 = path.resolve(process.cwd(), filePath1)
    const fullPath2 = path.resolve(process.cwd(), filePath2)

    const fileContent1 = fs.readFileSync(fullPath1, 'utf-8')
    const fileContent2 = fs.readFileSync(fullPath2, 'utf-8')

    const data1 = JSON.parse(fileContent1)
    const data2 = JSON.parse(fileContent2)

    console.log(genDiff(data1, data2))
  })

program.parse(process.argv)