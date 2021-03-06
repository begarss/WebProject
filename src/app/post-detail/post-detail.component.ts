import {Component, OnInit, Input} from '@angular/core';
import {Post} from '../Models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PostService} from '../post.service';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  thumb = faThumbsUp;
  thumbD = faThumbsDown;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => this.post = post);
  }

  goBack(): void {
    this.location.back();
  }
}
