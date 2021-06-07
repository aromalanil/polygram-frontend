export const makeObjectFromArray = (array, initialValue) => {
  const createdObject = {};
  array.forEach((element) => {
    createdObject[element] = initialValue;
  });
  return createdObject;
};

/**
 *
 * A function to remove all entries of an object with a certain value
 * @param {Object} object The object to be modified
 * @param {any} valueToFilter The value to be filtered
 * @returns Modified object which will not contain the valueToFilter in it.
 */
export const filterObject = (object, valueToFilter) => {
  const newObject = { ...object };
  Object.keys(newObject).forEach(
    (key) => newObject[key] === valueToFilter && delete newObject[key]
  );
  return newObject;
};

export const getFullName = (user) => {
  const { first_name = null, last_name = null } = user || {};
  if (last_name) {
    return `${first_name} ${last_name}`;
  }
  return first_name;
};
