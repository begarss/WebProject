import DateTimeFormat = Intl.DateTimeFormat;

export class Category {
  id: number;
  catName: string;
}

class User {
  id: number;
  password: string;
  username: string;
  // tslint:disable-next-line:variable-name
  is_active: boolean;
}

export class Post {
  constructor(title: string, description: string, category_id: number, author_id: number) {
    this.title=title;
    this.author_id=author_id;
    this.category_id=category_id;
    this.description=description;
  }

  id: number;
  title: string;
  description: string;
  category: Category;
  is_published: false;
  date: DateTimeFormat;
  author: User;
  author_id:number;
  category_id: number;
}

export class LoginResponse {
  token: string;
}

