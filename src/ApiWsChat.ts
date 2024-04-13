import { useSelector } from "react-redux"
import { MessageType, StatusType, sendMessage } from "./redux/dialogsReducer"
import { RootStateType } from "./redux/redux-store"

type MessageRecievedSubscriberType = (currentId: number) => void
type WsStatusChangedSubscriberType = (wsStatus: StatusType) => void
export type EventType = 'message-recieved' | 'wsStatus-changed'

let subscribers = {
    'message-recieved': [] as Array<MessageRecievedSubscriberType>,
    'wsStatus-changed': [] as Array<WsStatusChangedSubscriberType>
}

let ws: WebSocket

const closeHandler = () => {
    setTimeout(() => console.log('CLOSED'), 5000)
    subscribers["wsStatus-changed"].forEach(subscriber => subscriber('pending'))
}

const openHandler = () => {
    subscribers["wsStatus-changed"].forEach(subscriber => subscriber('ready'))
}

let currentId = 0
export let getCurrenrId = (currentUserId: number) => currentId = currentUserId
const messageHandler = (e: MessageEvent) => {
    debugger
    subscribers["message-recieved"].forEach(subscriber => subscriber(currentId))
}

const errorHandler = () => {
    console.log('SOME ERROR WITH WS')
}

const cleanUp = () => {
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', closeHandler)
    ws?.removeEventListener('error', errorHandler)
}

function createWsChannel(){
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    subscribers["wsStatus-changed"].forEach(subscriber => subscriber('pending'))
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('error', errorHandler)
}

export const chatApi = {
    start(){
        createWsChannel()
    },
    stop(){
        ws?.close()
    },
    subscribe(event: EventType, callback: MessageRecievedSubscriberType | WsStatusChangedSubscriberType) {
        subscribers[event].push(callback)
    },
    unsubscribe(event: EventType, callback: MessageRecievedSubscriberType | WsStatusChangedSubscriberType){
        subscribers[event] = subscribers[event].filter(s => s !== callback)     
    },
    sendMessage(message: string){
        ws?.send(message)
    }
}