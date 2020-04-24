import { Component, OnInit } from '@angular/core';
import {Category} from '../models';
import {CategoriesService} from '../categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  constructor(private categoryService: CategoriesService) { }
  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }
  ngOnInit(): void {
    this.getCategories();
  }

}
