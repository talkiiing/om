import DefaultExtendModel from './defaultExtend.model'
import Om from './om.model'
import UserModel from './user.model'

interface Step {
  feature: Om['_id']
  meta: Record<string, string>
}

interface PipelineModel extends DefaultExtendModel {
  initialDataset: string
  pairDataset?: string
  steps: Step[]
  user: UserModel
  name: string
  description: string
}

export default PipelineModel
