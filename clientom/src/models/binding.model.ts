import EntityModel from './entity.model'

interface BindingModel extends Record<string, string | any> {
  _id: string
  entity: EntityModel
  active: boolean
}

export default BindingModel
