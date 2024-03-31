export class AccountBank{
    id: number;
    number: string;
    name: string;
    bank: string;
    type: string;
    username: string;

    constructor(id: number, number: string, name: string, bank: string, type: string, username: string){
        this.id = id;
        this.number = number;
        this.name = name;
        this.bank = bank;
        this.type = type;
        this.username = username;
    }
}
