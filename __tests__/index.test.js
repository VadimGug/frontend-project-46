import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFixturePath = (name) => path.join(dirname, '__fixtures__', name);

const readFile = (name) => readFileSync(getFixturePath(name), 'utf-8').replace(/\r\n/g, '\n').trim();

test('compare flat files (json & yaml)', () => {
  const expected = readFile('expected_flat.txt').trim();

  const jsonPath1 = getFixturePath('file1.json');
  const jsonPath2 = getFixturePath('file2.json');
  expect(genDiff(jsonPath1, jsonPath2).trim()).toEqual(expected);

  const yamlPath1 = getFixturePath('file1.yml');
  const yamlPath2 = getFixturePath('file2.yaml');
  expect(genDiff(yamlPath1, yamlPath2).trim()).toEqual(expected);
});

test('compare nested files in plain format', () => {
  const expectedPlain = readFile('expected_plain.txt').trim();

  const jsonPath1 = getFixturePath('file1.json');
  const jsonPath2 = getFixturePath('file2.json');
  expect(genDiff(jsonPath1, jsonPath2, 'plain').trim()).toEqual(expectedPlain);

  const yamlPath1 = getFixturePath('file1.yml');
  const yamlPath2 = getFixturePath('file2.yaml');
  expect(genDiff(yamlPath1, yamlPath2, 'plain').trim()).toEqual(expectedPlain);
});

test('compare nested files in json format', () => {
  const jsonPath1 = getFixturePath('file1.json');
  const jsonPath2 = getFixturePath('file2.json');

  const result = genDiff(jsonPath1, jsonPath2, 'json');
  expect(() => JSON.parse(result)).not.toThrow();
  expect(Array.isArray(JSON.parse(result))).toBe(true);
});
