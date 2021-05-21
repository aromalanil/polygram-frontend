export const makeObjectFromArray = (array, initialValue) => {
  const createdObject = {};
  array.forEach((element) => {
    createdObject[element] = initialValue;
  });
  return createdObject;
};
