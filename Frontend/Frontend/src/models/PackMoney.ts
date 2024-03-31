export class PackMoney {
    id: number;
    name: string;
    price: number;
    description: string;
    coins: number;

    constructor(id: number, name: string, price: number, description: string, coins: number){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.coins = coins;
    }
}
