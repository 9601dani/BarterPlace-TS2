import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {UserService} from "../../../../service/user_service/user.service";
import Swal from "sweetalert2";
import {GuestService} from "../../../../service/guest_service/guest.service";
import {Chat} from "../../../models/Chat";

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
        { id: 1, text: 'Mensaje 1 este sera un mensaje mas largo para ver como se comporta', username: 'dani1', datetime: '2021-10-10 10:00:00' },
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
    constructor(
      private UserService: UserService,
      private GuestService: GuestService
    ) {
    }

    ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      this.getallChatsUser();
    }

  selectChat(chat: any) {
    this.selectedChat = chat;
  }

  getLastMessage(chat: Chat): string {
      if(chat.messages.length === 0){
        return 'No hay mensajes';
      }else{
        return chat.messages[chat.messages.length - 1].text;
      }
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }
    const date = new Date();
    const formattedDate = date.toISOString().split('.')[0].replace('T', ' ');
    const newMessage = {
      id: this.selectedChat.messages.length + 1,
      text: this.newMessage,
      username: this.currentUser.username,
      date_time: formattedDate,
      chat_id: this.selectedChat.id
    };
    this.selectedChat.messages.push(newMessage);
    this.UserService.saveNewMessage(newMessage).subscribe((data: any) => {
      if(data){
        console.log('Mensaje guardado');
      }else{
        console.log('Error al guardar el mensaje');
      }
    });
    this.newMessage = '';
  }

  openNewChat() {
      let username_a_enviar = '';
      Swal.fire({
        title: 'Nuevo chat',
        input: 'text',
        inputLabel: 'Nombre del usuario',
        inputPlaceholder: 'Nombre de usuario',
        showCancelButton: true,
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (username) => {
          return this.GuestService.getUser(username).toPromise().then((user: any) => {
            if (!user) {
              Swal.showValidationMessage('Usuario no encontrado');
            }else{
              username_a_enviar = username;
            }
          });
        }
      }).then((result) => {
          if (result.isConfirmed) {
            const newChat = {
              id: this.chats.length + 1,
              name: 'Chat '+this.chats.length + 1,
              username_receiver: username_a_enviar,
              username_sender: this.currentUser.username,
              messages: []
            };
            this.UserService.verificarChat(this.currentUser.username, username_a_enviar).subscribe((data: any) => {
              if(data){
                Swal.fire('Chat ya existe, Se le presentara en la pantalla');
                this.selectedChat = this.chats.find((chat: any) => chat.username_receiver === username_a_enviar || chat.username_sender === username_a_enviar);
              }else{
                this.UserService.saveNewChat(newChat).subscribe((data: any) => {
                  if(data){
                   Swal.fire('Chat creado');
                    this.getallChatsUser();
                  }else{
                  }
                });
              }
            });

          }
      });

  }

  getallChatsUser(){
      this.UserService.getChatUser(this.currentUser.username).subscribe((data: any) => {
        if(data){
          this.chats = data;
          //por cada chat, obtener los mensajes
          if(this.chats.length === 0){
          }else{
            this.chats.forEach((chat: any) => {
              chat.messages = [];
              this.UserService.getChatMessages(chat.id).subscribe((data: any) => {
                if(data!=null){
                  chat.messages = data;
                }else{
                  chat.messages = [];
                }
              });
            });
          }
        }else{
          this.chats = [];
        }
      });
  }

  verificarNombreChat(chat: Chat): string
  {
    if(chat.username_receiver === this.currentUser.username){
      return chat.username_sender;
    }else{
      return chat.username_receiver;
    }
  }

  hacerTransferencia(){
    //aqui vere quien esta enviando y quien recibiendo la transferencia sabiendo que hay un chat seleccionado
    let usuario_enviando = '';
    let usuario_recibiendo = '';
    if(this.selectedChat.username_receiver === this.currentUser.username){
      usuario_enviando = this.currentUser.username;
      usuario_recibiendo = this.selectedChat.username_sender;
    } else {
      usuario_enviando = this.currentUser.username;
      usuario_recibiendo = this.selectedChat.username_receiver;
    }
    console.log('Usuario enviando: '+usuario_enviando);
    console.log('Usuario recibiendo: '+usuario_recibiendo);
    Swal.fire({
      title: 'Transferencia',
      input: 'number',
      inputLabel: 'Monto a transferir',
      inputPlaceholder: 'Monto',
      showCancelButton: true,
      confirmButtonText: 'Transferir',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (monto) => {
        //verifico que sea un numero entero
        console.log('Monto: '+monto)
        if(Number.isInteger(monto) || monto <= 0){
          Swal.showValidationMessage('Monto invalido');
        }else{
          //verifico que tenga el monto suficiente
          let bank = JSON.parse(localStorage.getItem('bank') || '{}');
          if( bank.aplication_currency < monto){
            Swal.showValidationMessage('No tienes suficiente dinero');
          }else{
            //envio mensaje de transferencia
            const date = new Date();
            const formattedDate = date.toISOString().split('.')[0].replace('T', ' ');
            const newMessage = {
              id: this.selectedChat.messages.length + 1,
              text: '******** Transferencia de '+usuario_enviando+' a '+usuario_recibiendo+' por '+monto +'********',
              username: this.currentUser.username,
              date_time: formattedDate,
              chat_id: this.selectedChat.id
            }
            this.selectedChat.messages.push(newMessage);
            //mando a guardar el mensaje
            this.UserService.saveNewMessage(newMessage).subscribe((data: any) => {
              if(data){
                console.log('Mensaje guardado');
                //Hago la fecha actual en formato dd-mm-yyyy
                const date = new Date();
                const formattedDate = date.toISOString().split('.')[0].replace('T', ' ');
                //mando a guardar la transferencia
                this.UserService.transferir(usuario_enviando, usuario_recibiendo, monto, formattedDate).subscribe((data: any) => {
                  if(data) {
                    console.log('Transferencia exitosa');
                    //actualizo el bank
                    bank.aplication_currency = bank.aplication_currency - monto;
                    localStorage.setItem('bank', JSON.stringify(bank));
                    Swal.fire('Transferencia exitosa').then((result) => {
                    this.jalarBankYActualizarVariableDeServicio();
                    });
                  }
                });
              }else{
                console.log('Error al guardar el mensaje');
              }
            });
          }
        }
      }
    });
  }

  jalarBankYActualizarVariableDeServicio(){
      let bank = JSON.parse(localStorage.getItem('bank') || '{}');
      this.UserService.setCurrentAplicationMoney(bank.volunteer_currency+bank.aplication_currency);
  }
}
