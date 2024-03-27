export class Publication {
  id!: number;
  title!: string;
  description!: string;
  date!: string;
  status!: string;
  username!: string;
  foto!: string[];
  likes!: number;
  dislikes!: number;
  cost!: number;
  type!: string;
  category!: string;

  constructor(
    id: number,
    title: string,
    description: string,
    date: string,
    status: string,
    username: string,
    foto: string[],
    cost: number,
    type: string,
    category: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.status = status;
    this.username = username;
    this.foto = foto;
    this.cost = cost;
    this.type = type;
    this.category = category;
  }
}
