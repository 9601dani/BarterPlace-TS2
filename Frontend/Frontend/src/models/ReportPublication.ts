export class ReportPublication{
  id!: number;
  publication_id!: number;
  title!: string;
  description!: string;
  foto!: string;
  category!: string;
  unit_price!: number;
  username_publication!: string;
  comment!: string;
  date!: string;
  status!: string;
  username_report!: string;

  constructor(id: number, publication_id: number, title: string, description: string, foto: string,
              category: string, unit_price: number, username_publication: string, comment: string,
              date: string, status: string, username_report: string){
    this.id = id;
    this.publication_id = publication_id;
    this.title = title;
    this.description = description;
    this.foto = foto;
    this.category = category;
    this.unit_price = unit_price;
    this.username_publication = username_publication;
    this.comment = comment;
    this.date = date;
    this.status = status;
    this.username_report = username_report;
  }
}
