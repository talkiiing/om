import { swTunnel, getTypedSwTunnel } from './modules/swTunnel'
import {
  dispatch,
  register,
  unregister,
  cancelSubscriptionOnLeave,
} from './modules/dispatch'

export {
  swTunnel,
  getTypedSwTunnel,
  dispatch as dispatchMessage,
  register as registerClient,
  unregister as unregisterClient,
  cancelSubscriptionOnLeave,
}
