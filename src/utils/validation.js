/**
 *
 * A validator function to validate any string using character limit
 * @param {String} data Data to be validated
 * @param {Number} minLength Minimum length the string can have
 * @param {Number} maxLength Maximum length the string can have
 * @param {String} fieldName Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not
 */
export const validateString = (data, minLength, maxLength, fieldName, isRequired = false) => {
  if (data !== undefined && data !== '') {
    if (typeof data !== 'string') {
      throw new Error(`${fieldName} must be of type string`);
    } else if (data.length < minLength || data.length > maxLength) {
      throw new Error(`${fieldName} must be between ${minLength} and ${maxLength} characters`);
    }
  } else if (isRequired) {
    throw new Error(`${fieldName} field cannot be empty`);
  }
};

/**
 *
 * A validator function to validate Username
 * @param {String} username Username to be validated
 * @param {String} [fieldName] Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not.
 */
export const validateUsername = (username, fieldName = 'Username', isRequired = false) => {
  validateString(username, 4, 15, fieldName, isRequired);

  if (!/[a-z0-9_-]+$/.test(username))
    throw new Error(`${fieldName} must only contain small letters, numbers, dashes and underscore`);
};

/**
 *
 * A validator function to validate Password
 * @param {String} password Password to be validated
 * @param {String} [fieldName] Field name to be displayed in error message.
 * @param {Boolean} [isRequired] Is this field required or not
 */
export const validatePassword = (password, fieldName = 'Password', isRequired = false) => {
  validateString(password, 8, 50, fieldName, isRequired);

  if (password.search(/[a-z]/i) < 0) {
    throw new Error(`${fieldName} must contain at least one letter`);
  } else if (password.search(/[0-9]/) < 0) {
    throw new Error(`${fieldName} must contain at least one digit`);
  } else if (password.search(/[#?!@$ %^&*-]/) < 0) {
    throw new Error(`${fieldName} must contain at least one special character`);
  }
};
