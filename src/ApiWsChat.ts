import { MessageType, sendMessage } from "./redux/dialogsReducer"

type SubscriberType = (messages: Array<MessageType>) => void

let subscribers = [] as Array<SubscriberType>

let ws: WebSocket

const closeHandler = () => {
    console.log('CLOSED')
    createWsChannel()
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(subscriber => subscriber(newMessages))
}

function createWsChannel(){
    debugger
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
}

export const chatApi = {
    start(){
        createWsChannel()
    },
    stop(){
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
    },
    unsubscribe(callback: SubscriberType){
        subscribers = subscribers.filter(s => s !== callback)     
    },
    sendMessage(message: string){
        ws?.send(message)
    }
}