import { ClientMap } from '../types'

const thrutab_ls_key = '__thru-tab_'

export const get = (): ClientMap[] =>
  JSON.parse(window.localStorage.getItem(thrutab_ls_key + 'clients') || '[]') ||
  []

export const associate = (uuid: string, hash: string) => {
  window.localStorage.setItem(
    thrutab_ls_key + 'clients',
    JSON.stringify([...get(), { uuid: uuid, hash: hash }]),
  )
}

export const remove = (uuid: string) => {
  window.localStorage.setItem(
    thrutab_ls_key + 'clients',
    JSON.stringify(get().filter((v) => v.uuid !== uuid)),
  )
}
