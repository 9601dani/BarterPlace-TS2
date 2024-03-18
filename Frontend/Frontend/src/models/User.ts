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
  constructor(username: string, email: string, password: string, name: string, date_of_birth: string, description: string, profile_picture: string, role: string,gender: string){
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
    this.date_of_birth = date_of_birth;
    this.description = description;
    this.profile_picture = profile_picture;
    this.role = role;
    this.gender=gender;
  }
}
