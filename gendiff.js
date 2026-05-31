#!/usr/bin/env node

import { Command } from 'commander'

const program = new Command()

program
	.name('gendiff')
	.description('Compares two configuration files and show a difference.')
	.version('1.0.0', '-V, --version', 'output the current version')
	.helpOption('-h, --help', 'display help for command')
	.arguments('<filepath1> <filepath2>')
	.option('-f, --format [type]', 'output format', 'stylish')
	.action((filepath1, filepath2, options) => {
		console.log(`Comparing ${filepath} and ${filepath2} with format: ${options.format}`)
	})

	program.parse(process.argv)

