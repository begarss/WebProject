import {Component, OnInit} from '@angular/core';
import {Category} from '../models';
import {Post} from '../models';
import {CategoriesService} from '../categories.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  constructor(private categoriesService: CategoriesService, private route: ActivatedRoute) {
  }

  thumb = faThumbsUp;
  thumbD = faThumbsDown;
  posts: Post[] = [];
  category: Category;

  ngOnInit(): void {
    // this.getByCategory();
    console.log(this.route);
    this.route.params.subscribe(
      params => {
        const id = +params.id;
        this.categoriesService.getPostsByCat(id).subscribe(posts => this.posts = posts);
        this.categoriesService.getCategory(id).subscribe(cat => this.category = cat);

      }
    );
    // this.getPosts()
  }

  getPosts() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoriesService.getCategory(id).subscribe(cat => this.category = cat);

    this.categoriesService.getPostsByCat(id).subscribe(data => this.posts = data);
  }

  // getByCategory(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.categoriesService.getPostsByCat(id).subscribe(posts => this.posts = posts);
  // }

  open(id: number): void {
    // this.location.go(`/post/${id}`);

    window.location.href = `/post/${id}`;
  }
}
