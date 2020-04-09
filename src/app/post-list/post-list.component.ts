import {Component, OnInit} from '@angular/core';
import {Post} from '../posts';
import {PostService} from '../post.service';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
import {Category} from '../category';
import {CategoriesService} from '../categories.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[];
  categories: Category[];
  thumb = faThumbsUp;
  thumbD = faThumbsDown;
  category: Category;

  constructor(private postService: PostService, private location: Location, private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.getPosts();
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(cat => this.categories = cat);
  }

  getCategoryName(id: number): string {
    this.categoriesService.getCategory(id).subscribe(cat => this.category = cat);
    return this.category.name;
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  open(id: number): void {
    // this.location.go(`/post/${id}`);
    window.location.href = `/post/${id}`;
  }
}
