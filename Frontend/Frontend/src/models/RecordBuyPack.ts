export class RecordBuyPack{
    id: number;
    date: string;
    combo_name: string;
    price: number;
    coins: number;
    username: string;

    constructor(id: number, date: string, combo_name: string, price: number, coins: number, username: string){
        this.id = id;
        this.date = date;
        this.combo_name = combo_name;
        this.price = price;
        this.coins = coins;
        this.username = username;
    }
}
