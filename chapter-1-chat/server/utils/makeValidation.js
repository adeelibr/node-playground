
const types = {
  string: 'string',
}

const isString = (value) => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return false;
  }
  return true;
}

/**
 * validate body
 * @param {Object} payload 
 * @param {Object} checks
 * @param {Object} types
 */
const validate = ({ payload = undefined, checks = undefined, types }) => {
  let errors = {};
  let isFormValid = true;
  let errorMessage = "";
  console.log('payload', payload);

  if (!payload) {
    isFormValid = false;
    errors["general"] = 'Missing payload i.e, req.body';
  }

  if (payload) {
    Object.keys(checks).map(checkKey => {
      switch (checks[checkKey].type) {
        case types.string: {
          if (!isString(payload[checkKey])) {
            isFormValid = false;
            errors[checkKey] = `Please provide ${checkKey} as a string & not empty`
          }
          break;
        }
        default: {
          isFormValid = false;
          errors[checkKey] = `Unknown error ..`
        }
      }
    })
  }

  if (!isFormValid) {
    errorMessage = "Kindly fix the errors";
  }

  return {
    success: isFormValid,
    errorMessage,
    errors,
  }
}

/**
 * @description validation function to check body
 * @param {*} cb
 * @returns {success: Boolean, errors: Object, errorMessage: String} 
 * @example
    const { success, errors, errorMessage } = makeValidation(types => ({
      payload: req.body,
      checks: {
        firstName: { type: types.string },
        lastName: { type: types.string },
      }
    }));
    if (!success) {
      return res.status(400).json({
        success: false,
        errorMessage,
        errors,
      });
    } 
 */
export default function makeValidation(cb) {
  const { payload, checks } = cb(types);
  return validate({ payload, checks, types });
}