import {Component, OnInit} from '@angular/core';
import {formatDate, Location} from '@angular/common';
import {PostService} from '../post.service';
import {Post, Category} from '../models';
import DateTimeFormat = Intl.DateTimeFormat;
import {CategoriesService} from "../categories.service";

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {
  posts: Post[];
  categories: Category[];

  constructor(private location: Location, private postService: PostService, private categoriesService: CategoriesService
  ) {
  }

  ngOnInit(): void {
    this.getCategories();

  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }

  backClicked() {
    this.location.back();
  }

  title = '';
  description = '';
  author_id = 1;
  category_id = 1;

  add(): void {
    this.title.trim();
    this.description.trim();
    if (!this.title) {
      return;
    }
    this.postService.addPost(new Post(this.title, this.description, this.category_id, this.author_id))
      .subscribe(post => {
        this.posts.push(post);
      });
  }

  // onSubmit(): void {
  //   console.log(this.paperModel);
  //   //this.paperService.create(this.paperService);
  // }
}
