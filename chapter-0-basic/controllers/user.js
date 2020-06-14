const makeValidation = require('@withvoid/make-validation')

const userController = {
  getAll: (req, res, next) => {
    console.log(req.information)
    return res.status(200).json({ success: true, message: 'Job well done' })
  },
  getById: (req, res, next) => {
    const { id } = req.params
    return res
      .status(200)
      .json({ success: true, message: `Job very well done ${id}` })
  },
  createUser: (req, res, next) => {
    const { firstName, lastName, email, userType } = req.body

    // let errors = {}
    // let errorMessage = ''
    // let isBodyValid = true

    // if (
    //   !firstName ||
    //   typeof firstName !== 'string' ||
    //   firstName.trim().length === 0
    // ) {
    //   isBodyValid = false
    //   errors['firstName'] = 'This should be a string & not empty'
    // }
    // if (
    //   !lastName ||
    //   typeof lastName !== 'string' ||
    //   lastName.trim().length === 0
    // ) {
    //   isBodyValid = false
    //   errors['lastName'] = 'This should be a string & not empty'
    // }
    // if (!email || typeof email !== 'string' || email.trim().length === 0) {
    //   isBodyValid = false
    //   errors['email'] = 'This should be a string & not empty'
    // }

    // if (
    //   !userType ||
    //   typeof userType !== 'string' ||
    //   userType.trim().length === 0
    // ) {
    //   isBodyValid = false
    //   errors['userType'] = 'This should be a string & not empty'
    // } else {
    //   const checks = ['user', 'admin', 'support']
    //   const found = checks.some(check => check === userType)

    //   if (!found) {
    //     isBodyValid = false
    //     errors['userType'] =
    //       'This should be a string & can have these values ' + checks.join(',')
    //   }
    // }

    // if (!isBodyValid) {
    //   return res.status(400).json({
    //     success: isBodyValid,
    //     errorMessage: 'Kindly correct the error(s)',
    //     errors
    //   })
    // }

    const result = makeValidation(types => {
      return {
        payload: req.body,
        checks: {
          firstName: { type: types.string, options: { empty: false } },
          lastName: { type: types.string, options: { empty: false } },
          email: { type: types.string, options: { empty: false } },
          userType: {
            type: types.enum,
            options: {
              enum: {
                0: 'admin',
                2: 'super-admin',
                3: 'user',
                4: 'support'
              }
            }
          }
        }
      }
    })
    if (!result.success) {
      return res.status(400).json({ ...result })
    }

    // only execute everything below once I am sure that the data is
    // correct
    const userPayload = {
      firstName,
      lastName,
      email,
      userType
    }
    return res.status(200).json({
      success: true,
      message: `Job well done`,
      data: userPayload
    })
  },
  updateUser: (req, res, next) => {
    const { id } = req.params
    return res
      .status(200)
      .json({ success: true, message: `Updated user id: ${id}` })
  },
  deleteUser: (req, res, next) => {
    const { id } = req.params
    return res
      .status(200)
      .json({ success: true, message: `Delete user id: ${id}` })
  }
}

module.exports = userController
