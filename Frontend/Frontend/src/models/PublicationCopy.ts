export class PublicationCopy{
  id:number;
  title:string;
  description:string;
  date_sell:string;
  username_seller:string;
  username_buyer:string;
  foto:string
  total_cost!: number;
  publication_type_id!: number;
  category!: string;
  unit_price!: number;
  quantity!: number;

  constructor(id:number, title:string, description: string ,date_sell:string, username_seller:string, username_buyer:string,
              foto:string, total_cost:number, publication_type_id:number, category:string,
              unit_price: number, quantity:number) {
    this.id= id;
    this.title= title;
    this.description= description;
    this.date_sell= date_sell;
    this.username_seller= username_seller;
    this.username_buyer= username_buyer;
    this.foto = foto;
    this.total_cost= total_cost;
    this.publication_type_id = publication_type_id;
    this.category = category;
    this.unit_price = unit_price;
    this.quantity = quantity;
  }
}
