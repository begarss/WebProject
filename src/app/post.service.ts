import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Post, LoginResponse, Favorites} from './models';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  BASE_URL = 'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private heroesUrl = 'api/posts';  // URL to web api
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** GET heroes from the server */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/api/posts/`)
      .pipe(tap(_ => this.log('fetched heroes')), catchError(this.handleError<Post[]>('getPosts', [])));
  }
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/api/admin/`)
      .pipe(tap(_ => this.log('fetched heroes')), catchError(this.handleError<Post[]>('getPosts', [])));
  }
  getUserPosts(id:number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/api/profile/${id}/`)
      .pipe(tap(_ => this.log('fetched heroes')), catchError(this.handleError<Post[]>('getPosts', [])));
  }
  /** GET hero by id. Will 404 if id not found */
  getPost(id: number): Observable<Post> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Post>(`${this.BASE_URL}/api/posts/${id}/`).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Post>(`getHero id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  addToFav(post: Favorites): Observable<Favorites> {
    return this.http.post<Favorites>(`${this.BASE_URL}/api/fav/`, post, this.httpOptions).pipe(
      tap((newPost: Favorites) => this.log(`added post w/ id=${newPost.id}`)),
      catchError(this.handleError<Favorites>('addPost'))
    );
  }
  getOneFav(id: number): Observable<Favorites[]> {
    return this.http.get<Favorites[]>(`${this.BASE_URL}/api/fav/${id}/`).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Favorites[]>(`getHero id=${id}`))
    );
  }
  deleteOneFav(id: number,id2:number): Observable<Favorites> {
    return this.http.delete<Favorites>(`${this.BASE_URL}/api/fav/${id}/${id2}/`).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Favorites>(`getHero id=${id}`))
    );
  }
  getFavs(): Observable<Favorites[]> {
    return this.http.get<Favorites[]>(`${this.BASE_URL}/api/fav/`)
      .pipe(tap(_ => this.log('fetched heroes')), catchError(this.handleError<Favorites[]>('getPosts', [])));
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.BASE_URL}/api/posts/`, post, this.httpOptions).pipe(
      tap((newPost: Post) => this.log(`added post w/ id=${newPost.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }
  deletePost( id:number): Observable<Post> {
    return this.http.delete<Post>(`${this.BASE_URL}/api/admin/${id}`).pipe(
      tap((newPost: Post) => this.log(`added post w/ id=${newPost.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }
  EditPost(post: Post, id:number): Observable<Post> {
    return this.http.put<Post>(`${this.BASE_URL}/api/admin/${id}/`, post, this.httpOptions).pipe(
      tap((newPost: Post) => this.log(`added post w/ id=${newPost.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }
  login(username, password): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/api/login/`, {
      username,
      password
    });
  }

}
