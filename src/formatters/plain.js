import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (tree) => {
  const iter = (nodes, keys) => {
    const lines = nodes.flatMap((node) => {
      const currentPath = [...keys, node.key].join('.');

      switch (node.type) {
        case 'nested':
          return iter(node.children, [...keys, node.key]);
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    });

    return lines.join('\n');
  };

  return iter(tree, []);
};

export default formatPlain;
