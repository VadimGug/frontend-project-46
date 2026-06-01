#!/usr/bin/env node

import { Command } from 'commander'
import generateDiff from '../src/index.js'

const program = new Command()

program
	.name('gendiff')
	.description('Compares two configuration files and show a difference.')
	.version('1.0.0', '-V, --version', 'output the current version')
	.helpOption('-h, --help', 'display help for command')
	.arguments('<filepath1> <filepath2>')
	.option('-f, --format [type]', 'output format', 'stylish')
	.action((filePath1, filePath2) => {
  		generateDiff(filePath1, filePath2)
	})

	program.parse(process.argv)

