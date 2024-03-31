export class Tarjet{
    id: number;
    number: string;
    name: string;
    expiration: string;
    cvv: string;
    username: string;

    constructor(id: number, number: string, name: string, expiration: string, cvv: string, username: string){
        this.id = id;
        this.number = number;
        this.name = name;
        this.expiration = expiration;
        this.cvv = cvv;
        this.username = username;
    }

}
