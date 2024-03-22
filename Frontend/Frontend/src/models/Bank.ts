export class Bank {
    id: number;
    volunteer_currency: number;
    aplication_currency: number;
    money: number;
    username: string;
    constructor(id: number, volunteer_currency: number, aplication_currency: number, money: number, username: string){
      this.id = id;
      this.volunteer_currency = volunteer_currency;
      this.aplication_currency = aplication_currency;
      this.money = money;
      this.username = username;
    }
}
