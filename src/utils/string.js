/**
 *
 * Function which cuts string into a shorter form
 * @param {String} string The string to be cut
 * @param {Number} maxLength The maximum allowed length of the string
 * @returns
 */
export const getShortString = (string, maxLength) => {
  const stringLength = string.length;
  if (stringLength <= maxLength) return string;

  return `${string.substring(0, maxLength)}...`;
};
