const parse = (data, format) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  throw new Error(`Unknown format: '${format}'`);
};

export default parse;
