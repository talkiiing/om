interface NewsfeedModel extends Record<string, string | any> {
  _id: string
  title: string
  text: string
  shop: string
}

export default NewsfeedModel
