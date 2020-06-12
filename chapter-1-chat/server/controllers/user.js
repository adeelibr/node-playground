import UserModel, { USER_TYPES } from '../models/User.js';
// utils
import makeValidation from '../utils/makeValidation.js';

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      if (error.error) {
        return res.status(400).json({ success: false, error: error.error })
      }
      return res.status(500).json({ success: false, error: error })
    }
  },
  onGetUserById: async (req, res) => {
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
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          firstName: { type: types.string },
          lastName: { type: types.string },
          type: { type: types.enum, options: { enums: USER_TYPES } },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { firstName, lastName, type } = req.body;
      const user = await UserModel.createUser(firstName, lastName, type);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      if (error.error) {
        return res.status(400).json({ success: false, error: error.error })
      }
      return res.status(500).json({ success: false, error: error })
    }
  },
  onGetUsersById: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          userIds: { type: types.arrayOfStrings, options: { unique: true } },
        },
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const user = await UserModel.getUserByIds(req.body.userIds);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      if (error.error) {
        return res.status(400).json({ success: false, error: error.error })
      }
      return res.status(500).json({ success: false, error: error })
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({ 
        success: true, 
        message: `Deleted a count of ${user.deletedCount} user.` 
      });
    } catch (error) {
      if (error.error) {
        return res.status(400).json({ success: false, error: error.error })
      }
      return res.status(500).json({ success: false, error: error })
    }
  },
}