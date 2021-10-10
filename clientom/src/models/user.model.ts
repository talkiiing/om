import DefaultExtendModel from './defaultExtend.model'

interface UserModel extends DefaultExtendModel {
  auth0Id: string
  email: string
}

export default UserModel
