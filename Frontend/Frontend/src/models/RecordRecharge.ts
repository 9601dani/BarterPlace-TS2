export class RecordRecharge{
  id:number;
  date:string;
  amount:number;
  type:string;
  number:string;
  username:string;

  constructor(id:number, date:string, amount:number, type:string, number:string, username:string){
    this.id = id;
    this.date = date;
    this.amount = amount;
    this.type = type;
    this.number = number;
    this.username = username;
  }
}
