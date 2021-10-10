import DefaultExtendModel from './defaultExtend.model'
import UserModel from './user.model'
import PipelineModel from './pipeline.model'

interface DatasetModel extends DefaultExtendModel {
  pipeline: PipelineModel['_id']
  user: UserModel
  name: string
}

export default DatasetModel
