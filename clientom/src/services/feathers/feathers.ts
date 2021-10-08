import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios'
import feathersClient from '@feathersjs/client'
import auth from '@feathersjs/authentication-client'

const app = feathers()
const restClient = rest('https://heal-server.herokuapp.com')
app.configure(restClient.axios(axios))

app.configure(feathersClient.authentication())
app.configure(auth({
  storageKey: 'AuthToken'
}))

export {app}
