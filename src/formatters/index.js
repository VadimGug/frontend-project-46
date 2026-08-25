import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(tree);
    case 'plain':
      return formatPlain(tree);
    default:
      throw new Error(`Unknown format: '${formatName}`);
  }
};

export default format;
