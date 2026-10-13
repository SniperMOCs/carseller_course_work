import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class ChatWebSocketService {
    constructor() {
        this.stompClient = null;
        this.subscriptions = {};
        this.messageCallbacks = {};
    }

    connect(onConnect, onError) {
        const socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);
        
        this.stompClient.connect({}, () => {
            onConnect && onConnect();
        }, (error) => {
            onError && onError(error);
            setTimeout(() => this.connect(onConnect, onError), 5000);
        });
    }

    subscribeToChat(chatId, callback) {
        if (!this.stompClient || !this.stompClient.connected) {
            return;
        }

        if (!this.subscriptions[chatId]) {
            const subscription = this.stompClient.subscribe(
                `/topic/chat.${chatId}`,
                (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    callback(receivedMessage);
                }
            );
            this.subscriptions[chatId] = subscription;
            this.messageCallbacks[chatId] = callback;
        }
    }

    unsubscribeFromChat(chatId) {
        if (this.subscriptions[chatId]) {
            this.subscriptions[chatId].unsubscribe();
            delete this.subscriptions[chatId];
            delete this.messageCallbacks[chatId];
        }
    }

    disconnect() {
        if (this.stompClient) {
            Object.keys(this.subscriptions).forEach(chatId => {
                this.unsubscribeFromChat(chatId);
            });
            this.stompClient.disconnect();
        }
    }
}

export default new ChatWebSocketService();