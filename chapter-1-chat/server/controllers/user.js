import UserModel from '../models/User.js';
// utils
import makeValidation from '../utils/makeValidation.js';

export default {
  onGetAllUsers: async (req, res) => {
    res.send('respond with a resource');
  },
  onGetUser: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      if (error.error) {
        return res.status(400).json({ success: false, error: error.error })
      }
      return res.status(500).json({ success: false, error: error })
    }
  },
  onCreateUser: async (req, res) => {
    try {
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
      const { firstName, lastName } = req.body;
      const user = await UserModel.createUser(firstName, lastName);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      if (error.error) {
        return res.status(400).json({ success: false, error: error.error })
      }
      return res.status(500).json({ success: false, error: error })
    }
  },
}