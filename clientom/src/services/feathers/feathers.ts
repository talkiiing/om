import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
import feathersClient from '@feathersjs/client'
import auth from '@feathersjs/authentication-client'

const app = feathers()
const restClient = rest('https://om.s.ix3.space')

const axiosInstance = axios.create({
  headers: {
    'request-agent': 'axios',
  },
})

app.configure(restClient.axios(axiosInstance))

app.configure(feathersClient.authentication())
app.configure(
  auth({
    storageKey: 'accessToken',
  }),
)

export { app }
