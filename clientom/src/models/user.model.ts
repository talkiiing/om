interface UserModel extends Record<string, string | undefined> {
  name: string
  login: string
  role: string
  _id: string
  shop?: string
}

export default UserModel
