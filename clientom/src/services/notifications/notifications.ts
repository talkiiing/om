import Logo from '../../assets/logo.svg'

export enum NotificationLogos {
  default = '/logo192.png',
  // mascotWalking = ...
  // mascotSitting = ...
}

const isNotificationsSupported = () => window.hasOwnProperty('Notification')

class NotificationService {
  allowNotifications: boolean
  canNotify: boolean = false

  constructor() {
    if (isNotificationsSupported()) {
      this.allowNotifications = Notification.permission === 'granted'
      Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status)
      })
      navigator.permissions
        .query({ name: 'notifications' })
        .then((notificationPerm) => {
          notificationPerm.onchange = () => {
            console.log(
              'User decided to change his settings. New permission: ' +
                notificationPerm.state
            )
            this.allowNotifications = notificationPerm.state === 'granted'
          }
        })
    } else {
      this.allowNotifications = false
    }
  }

  send = (
    text: string,
    logo: NotificationLogos = NotificationLogos.default
  ) => {
    if (this.allowNotifications && this.canNotify) {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        console.log(Logo)
        reg !== undefined && reg
          ? reg.showNotification('Postee', {
              body: text,
              icon: logo,
            })
          : console.log("Notification isn't delivered")
      })
    }
  }
}

const notificationService = new NotificationService()

export { isNotificationsSupported, notificationService }
