import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Favorites, Post} from "../models";
import {PostService} from "../post.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {faThumbsUp, faThumbsDown, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  posts: Post[] = [];
  favs:Favorites[]=[];
  star = faStar;

  constructor(private route: ActivatedRoute,private userService:UserService,private postService:PostService) { }
  postShow:boolean;
  favShow:boolean;
  UserName$ : Observable<string>;
  LoginStatus$: Observable<boolean>;
  UserId$: Observable<string>;

  ngOnInit(): void {
    this.getPosts();
    this.LoginStatus$ = this.userService.isLoggesIn;
    this.UserId$ = this.userService.currentUserId;

    this.UserName$ = this.userService.currentUserName;
    this.getFav();
  this.postShow=true;
  }
  getPosts(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.postService.getUserPosts(id).subscribe(posts => this.posts = posts);
  }
  getFav(){
    const id = +this.route.snapshot.paramMap.get('id');

    this.postService.getOneFav( id).subscribe(res => this.favs = res);

  }
  open(id: number): void {
    // this.location.go(`/post/${id}`);
    window.location.href = `/post/${id}`;
  }
  showPost(){
    this.postShow=true;
    this.favShow=false;

  }
  showFav(){
    this.postShow=false;
    this.favShow=true;
  }
  Number(UserId: string) {
    return +UserId;
  }
  AddToFav(author_id: number, is_fav: boolean, post_id: number): void {
    // this.like()
    //   if (is_fav==true)
    //     this.liked=true;
    //   else
    //     this.liked=false;
    // this.getOneFav(post_id, author_id);
    this.postService.addToFav(new Favorites(post_id, author_id, is_fav))
      .subscribe(post => {
        this.favs.push(post);


      });
  }
  delete(author_id: number, post_id: number): void {
    // this.like()
    //   if (is_fav==true)
    //     this.liked=true;
    //   else
    //     this.liked=false;
    // this.getOneFav(post_id, author_id);
    window.location.reload();

    this.postService.deleteOneFav(post_id,author_id)
      .subscribe(post => {
        this.favs.push(post);


      });
  }
}
