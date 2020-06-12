
/**
 * Enums for different catefory of validations
 */
const VALIDATION_TYPES = {
  string: 'string',
  enum: 'enum',
  arrayOfStrings: 'array-of-strings',
  arrayOfObject: 'array-of-objects',
}

const isString = (value) => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return false;
  }
  return true;
}

const isValidEnum = (value, enumValues) => {
  return enumValues.some(enumItem => enumItem === value);
}

const isArray = (array) => {
  return Array.isArray(array);
}

const isArrayUnique = (array) => {
  return (new Set(array)).size === array.length;
}

/**
 * Standard error method
 * 
 * @returns {{ success: boolean = false, errorMessage: string = "", errors: object = {} }} response - return error object
 */
const getError = ({ success = false, errorMessage = success ? "" : "Kindly fix the error(s)", errors = {} }) => {
  return {
    success,
    errorMessage,
    errors
  }
};

/**
 * Method to validate req.body with checks provided
 * 
 * @todo generic method to check if key is available or not.
 * @todo types.array, { options => unique, minLength }
 * @todo types.youtube
 * @todo types.string { options => except }
 * 
 * @param {Object} args - the args passed to the method 
 * @param {Object} response.payload - Expects the `req.body` or any object you want to validation
 * @param {Object} response.checks - The check object, checks types from the response.payload arg to see if it is valid or not
 */
const validate = ({ payload = undefined, checks = undefined }) => {
  let errors = {};
  let isFormValid = true;

  if (!payload) {
    isFormValid = false;
    errors["general"] = 'Missing payload i.e, req.body';
  }

  if (payload) {
    Object.keys(checks).map(checkKey => {
      const { type, options = {}} = checks[checkKey];
      switch (type) {
        case VALIDATION_TYPES.string: {
          if (!isString(payload[checkKey])) {
            isFormValid = false;
            errors[checkKey] = `Please provide ${checkKey} as a string & not empty`
          }
          break;
        }
        case VALIDATION_TYPES.enum: {
          const enumValues = Object.values(options.enums);
          if (!payload[checkKey]) {
            isFormValid = false;
            errors[checkKey] = `Missing value for ${checkKey}`;
          } else if (!isValidEnum(payload[checkKey], enumValues)) {
            isFormValid = false;
            errors[checkKey] = `Possible value for ${checkKey} are ${enumValues}`
          }
          break;
        }
        case VALIDATION_TYPES.arrayOfStrings: {
          if (!isArray(payload[checkKey])) {
            isFormValid = false;
            errors[checkKey] = `Please provide ${checkKey} as a array`
          } else {
            const areStrings = payload[checkKey].every(item => isString(item));
            if (!areStrings) {
              isFormValid = false;
              errors[checkKey] = `Please provide ${checkKey} as an array of only string`;
              return;
            }
            if (options.unique) {
              if (!isArrayUnique(payload[checkKey])) {
                isFormValid = false;
                errors[checkKey] = `Please provide ${checkKey} as a unique array`
                return;
              }
            }
          }
          break;
        }
        default: {
          isFormValid = false;
          errors[checkKey] = `Unknown type passed ${type}`
        }
      }
    })
  }

  return getError({ success: isFormValid, errors });
}

/**
 * Validation method to check the request body you get from user & compares it with
 * your own list of checks & returns an error if error(s) is/are found.
 * 
 * @param {function(VALIDATION_TYPES)} cb - callback function that gives `VALIDATION_TYPES` in return i.e, makeValidation(types => {})
 * @returns {{success: boolean, errorMessage: string, errors: object}} response - returns of method
 * @example
 *  
    const validation = makeValidation(types => ({
      payload: req.body,
      checks: {
        firstName: { type: types.string },
        lastName: { type: types.string },
        userType: { type: types.enum, enums: { 0: 'admin', 1: 'consumer' } },
        userIds: { type: types.arrayOfStrings },
        users: { 
          type: types.arrayOfObject, 
          options: {
            id: { type: types.string },
            name: { type: types.string },
          } 
        },
      }
    }));
    // const { success, errors, errorMessage } = validation;
    if (!validation.success) return res.status(400).json({ ...validation });
 */
export default function makeValidation(cb = () => { }) {
  const result = cb(VALIDATION_TYPES);
  if (!result) getError({ errorMessage: 'Missing payload & checks for makeValidation method' })
  const { payload, checks } = result;
  return validate({ payload, checks });
}