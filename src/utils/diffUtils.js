export const hasObjectChanged = (currentData, originalData) => {
  const changes = {};

  Object.keys(currentData).forEach((key) => {
    if (currentData[key] !== originalData[key]) {
      changes[key] = currentData[key];
    }
  });

  return Boolean(Object.keys(changes).length);
};

export const hasArrayChanged = (currentArray, originalArray) => {
  return JSON.stringify(currentArray) !== JSON.stringify(originalArray);
};
