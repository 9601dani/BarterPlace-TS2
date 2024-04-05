export class Publication {
  id!: number;
  title!: string;
  description!: string;
  date!: string;
  status!: string;
  username!: string;
  foto!: string;
  total_cost!: number;
  publication_type_id!: number;
  category!: string;
  unit_price!: number;
  quantity!: number;
  quantity_stock!: number;


  constructor(id: number, title: string, description: string, date: string, status: string,
              username: string, foto: string, total_cost: number, publication_type_id: number,
              category: string, unit_price: number, quantity: number, quantity_stock: number){
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.status = status;
    this.username = username;
    this.foto = foto;
    this.total_cost = total_cost;
    this.publication_type_id = publication_type_id;
    this.category = category;
    this.unit_price = unit_price;
    this.quantity = quantity;
    this.quantity_stock = quantity_stock;
  }
}
