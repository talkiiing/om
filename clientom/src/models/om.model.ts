import DefaultExtendModel from './defaultExtend.model'
import UserModel from './user.model'

interface Meta extends DefaultExtendModel {
  name: string
  inputType: string
  description: string
}

interface OmModel extends DefaultExtendModel {
  name: string
  description: string
  meta: Meta[]
  requiresPairDataset: boolean
  source: string
  sourceType: string
  user: UserModel
}

export default OmModel
