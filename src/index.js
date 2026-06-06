import _ from 'lodash';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const getFormat = (filepath) => path.extname(filepath).slice(1).toLowerCase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolveFilePath = (filePath) => {
  const directPath = path.resolve(filePath);
  if (fs.existsSync(directPath)) {
    return directPath;
  }

  const fixturePath = path.join(__dirname, '..', '__tests__', '__fixtures__', filePath);
  if (fs.existsSync(fixturePath)) {
    return fixturePath;
  }

  return directPath;
};

const genDiff = (filePath1, filePath2) => {
  const absolutePath1 = resolveFilePath(filePath1);
  const absolutePath2 = resolveFilePath(filePath2);

  const content1 = fs.readFileSync(absolutePath1, 'utf-8');
  const content2 = fs.readFileSync(absolutePath2, 'utf-8');

  const format1 = getFormat(absolutePath1);
  const format2 = getFormat(absolutePath2);

  const data1 = parse(content1, format1);
  const data2 = parse(content2, format2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const lines = sortedKeys.flatMap((key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return [
        `  - ${key}: ${data1[key]}`,
        `  + ${key}: ${data2[key]}`,
      ];
    }
    return `    ${key}: ${data1[key]}`;
  });

  return ['{', ...lines, '}'].join('\n');
};

export default genDiff;
