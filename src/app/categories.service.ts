import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Category, CATEGORY} from './category';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  getCategory(id: number): Observable<Category> {
    return of(CATEGORY.find(category => category.id === id));
  }
  getCategories(): Observable<Category[]> {
    return of(CATEGORY);
  }

}
