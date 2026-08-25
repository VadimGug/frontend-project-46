import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isObject(value) || value === null) {
    return String(value);
  }

  const indent = ' '.repeat(depth * 4);
  const bracketIndent = ' '.repeat(depth * 4);
  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}    ${key}: ${stringify(val, depth + 1)}`
  );

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatStylish = (tree) => {
  const iter = (node, depth) => {
    const indent = ' '.repeat(depth * 4 - 2);
    const bracketIndent = ' '.repeat(depth * 4);

    const lines = node.flatMap((item) => {
      switch (item.type) {
        case 'nested':
          return `${indent}  ${item.key}: {\n${iter(item.children, depth + 1)}\n${bracketIndent}}`;
        case 'added':
          return `${indent}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'deleted':
          return `${indent}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'unchanged':
          return `${indent}  ${item.key}: ${stringify(item.value, depth)}`;
        case 'changed':
          return [
            `${indent}- ${item.key}: ${stringify(item.oldValue, depth)}`,
            `${indent}+ ${item.key}: ${stringify(item.newValue, depth)}`,
          ];
        default:
          throw new Error(`Unknown type: ${item.type}`);
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(tree, 1)}\n}`;
};

export default formatStylish;
