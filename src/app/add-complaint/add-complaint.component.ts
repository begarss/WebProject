import {Component, OnInit} from '@angular/core';
import {formatDate, Location} from '@angular/common';
import {PostService} from '../post.service';
import {Post} from '../posts';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {
  posts: Post[];


  constructor(private location: Location, private postService: PostService
  ) {
  }

  ngOnInit(): void {
  }

  backClicked() {
    this.location.back();
  }

  add(title: string, description: string, author: string,  categoryId: number): void {
    title = title.trim();
    description = description.trim();
    if (!title) {
      return;
    }
    this.postService.addPost({title, description, author,  categoryId} as Post)
      .subscribe(post => {
        this.posts.push(post);
      });
  }

  // onSubmit(): void {
  //   console.log(this.paperModel);
  //   //this.paperService.create(this.paperService);
  // }
}
