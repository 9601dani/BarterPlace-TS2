export class User {
  username: string;
  email: string;
  password: string;
  name: string;
  date_of_birth: string;
  description: string;
  profile_picture: string;
  role: string;
  gender: string;
  is_seller: boolean;
  constructor(
    username: string, email: string, password: string, name: string, date_of_birth: string, description: string,
    profile_picture: string, role: string,gender: string, is_seller: boolean){
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
    this.date_of_birth = date_of_birth;
    this.description = description;
    this.profile_picture = profile_picture;
    this.role = role;
    this.gender=gender;
    this.is_seller=is_seller;
  }
}
