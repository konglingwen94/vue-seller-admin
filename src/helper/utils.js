export const pick = function(source, keys) {
  const results = {};
  keys.forEach((key) => {
    if (source.hasOwnProperty(key)) {
      results[key] = source[key];
    }
  });
  return results;
};
