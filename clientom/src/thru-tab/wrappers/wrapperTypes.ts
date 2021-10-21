import { MessageModel, RequestBasedMessage } from '../types'

export interface RequestDataProps {
  to?: MessageModel<any>['to']
  requestKey: string
  timeout?: number
}

export class RequestTimeoutError extends Error {
  name = 'RequestTimeout'
}

export type RequestHandlerFn = (
  data: RequestBasedMessage,
  reply: (data: RequestBasedMessage['answer']) => void,
  reject: () => void,
) => void
