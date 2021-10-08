interface RequestModel extends Record<string, string | any> {
  hash: string
  method: string
  url: string
  headers: boolean
  body: string
}

export default RequestModel
