export class RequestSeller{
  id_request: number;
  username: string;
  status:boolean;
  constructor(id_request: number, username: string, status:boolean){
    this.id_request = id_request;
    this.username = username;
    this.status = status;
  }
}
