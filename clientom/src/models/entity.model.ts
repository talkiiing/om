interface EntityModel extends Record<string, string | undefined> {
  barcode: string
  name: string
  type: 'product' | 'service' | 'accessory'
  _id: string
  brand?: string
  model?: string
}

export const parseType = (value: EntityModel['type']) => {
  switch (value) {
    case 'product':
      return 'Товар'
    case 'accessory':
      return 'Аксессуар'
    case 'service':
      return 'Услуга'
  }
}

export default EntityModel
