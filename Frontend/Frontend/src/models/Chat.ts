import {Message} from "./Message";

export class Chat {
    id: number;
    name: string;
    username_receiver: string;
    username_sender: string;
    messages: Message[];
    constructor(id: number, name: string, username_receiver: string, username_sender: string, messages: Message[]) {
        this.id = id;
        this.name = name;
        this.username_receiver = username_receiver;
        this.username_sender = username_sender;
        this.messages = messages;
    }
}
