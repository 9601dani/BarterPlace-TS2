export class Message {
    id: number;
    text: string;
    username: string;
    datetime: string;
    chat_id: number;
    constructor(id: number, text: string, username: string, datetime: string, chat_id: number) {
        this.id = id;
        this.text = text;
        this.username = username;
        this.datetime = datetime;
        this.chat_id = chat_id;
    }
}
