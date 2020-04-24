import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Category} from './models';
import {Post} from './models';
import {catchError, filter, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PostService} from './post.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  BASE_URL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient,
              private postService: PostService
  ) {
  }

  private posts: Observable<Post[]>;
  private heroesUrl = 'api/categories';

  getCategory(id: number): Observable<Category> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Category>(url);
  }

  // getCategories(): Observable<Category[]> {
  //   return of(CATEGORY);
  // }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BASE_URL}/api/categories/`);
  }

  getPostsByCat(id: number) {
    this.posts = this.postService.getPosts();
    // tslint:disable-next-line:triple-equals
    return this.posts.pipe(map(posts => posts.filter(res => res.category.id == id)));
  }
}
