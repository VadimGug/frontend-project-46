import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFixturePath = (name) => path.join(dirname, 'fixtures', name);

const readFile = (name) => readFileSync(getFixturePath(name), 'utf-8');

test('compare flat json files', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  const expected = readFile('expected_flat.txt');

  expect(genDiff(path1, path2)).toEqual(expected.trim());
});
