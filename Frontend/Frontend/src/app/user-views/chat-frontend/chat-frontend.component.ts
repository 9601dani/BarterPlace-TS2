import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";

@Component({
  selector: 'app-chat-frontend',
  templateUrl: './chat-frontend.component.html',
  styleUrls: ['./chat-frontend.component.css']
})
export class ChatFrontendComponent implements OnInit{
  public chats: any[] = [
    {
      id: 1,
      name: 'Chat 1',
      username_receiver: 'dani1',
      username_sender: 'dani3',
      messages: [
        { id: 1, text: 'Mensaje 1', username: 'dani1', datetime: '2021-10-10 10:00:00' },
        { id: 2, text: 'Mensaje 2', username: 'dani3', datetime: '2021-10-10 10:01:00' },
        { id: 3, text: 'Mensaje 3', username: 'dani3', datetime: '2021-10-10 10:02:00' },
        // Otros mensajes del Chat 1
      ]
    },
    {
      id: 2,
      name: 'Chat 2',
      username_receiver: 'dani1',
      username_sender: 'dani2',
      messages: [
        { id: 1, text: 'Mensaje 1', username: 'dani1', datetime: '2021-10-10 10:00:00' },
        { id: 2, text: 'Mensaje 2', username: 'dani2', datetime: '2021-10-10 10:01:00' }
      ]
    }
    // Otros chats
  ];
  public selectedChat: any;
  public currentUser!: User;
  public newMessage: string = '';
    constructor() {
    }

    ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    }

  selectChat(chat: any) {
    this.selectedChat = chat;
  }

  getLastMessage(chat: any): string {
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage ? lastMessage.text : 'No hay mensajes';
  }

  sendMessage() {

  }
}
