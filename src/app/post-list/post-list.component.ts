import {Component, Input, OnInit} from '@angular/core';
import {Favorites, Post} from '../models';
import {PostService} from '../post.service';
import {faThumbsUp, faThumbsDown, faStar} from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
import {Category} from '../models';
import {CategoriesService} from '../categories.service';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {UserService} from "../user.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  LoginStatus$: Observable<boolean>;
  UserId$: Observable<string>;
  favs: Favorites[] = [];

  UserName$: Observable<string>;
  posts: Post[] = [];
  categories: Category[];
  thumb = faThumbsUp;
  thumbD = faThumbsDown;
  star = faStar;
  category: Category;
  fav: Favorites;
  liked: boolean;

  constructor(private postService: PostService, private location: Location, private categoriesService: CategoriesService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.LoginStatus$ = this.userService.isLoggesIn;
    this.UserId$ = this.userService.currentUserId;

    this.getPosts();
    this.getCategories();
    this.getFavs();

  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(cat => this.categories = cat);
  }

  like(): void {
    if (this.fav.is_favorite == false) {
      this.fav.is_favorite = true;
    } else
      this.fav.is_favorite = false;

  }

  Number(UserId: string) {
    return +UserId;
  }

  // getOneFav(postid: number, userid: number) {
  //   this.postService.getOneFav(postid, userid).subscribe(res => this.fav = res);
  // }

  AddToFav(author_id: number, is_fav: boolean, post_id: number): void {
    // this.like()
    //   if (is_fav==true)
    //     this.liked=true;
    //   else
    //     this.liked=false;
    // this.getOneFav(post_id, author_id);
    console.log(this.fav);
    this.postService.addToFav(new Favorites(post_id, author_id, is_fav))
      .subscribe(post => {
        this.favs.push(post);


      });
    this.test()
  }
  delete(author_id: number, post_id: number): void {
    // this.like()
    //   if (is_fav==true)
    //     this.liked=true;
    //   else
    //     this.liked=false;
    // this.getOneFav(post_id, author_id);
    console.log(this.fav);
    this.postService.deleteOneFav(post_id,author_id)
      .subscribe(post => {
        this.favs.push(post);


      });
    this.test()
  }
  test(){
    console.log(this.fav);
    if (this.fav.is_favorite == true)
      this.liked = true;
    else
      this.liked = false;
  }

  containsObject(id: number, author_id: number, is_fav: boolean) {
    var i;
    var f = new Favorites(id, author_id, is_fav);
    for (i = 0; i < this.favs.length; i++) {
      console.log(this.favs[i]);

      if (this.favs[i] === f) {
        return true;
      }
    }

    return false;
  }

  checkFav(id: number, author_id: number, is_fav: boolean): boolean {
    if (this.favs.includes(new Favorites(id, author_id, is_fav)) == true)
      return true;
    return false;
  }

  getFavs(): void {
    this.postService.getFavs().subscribe(posts => this.favs = posts);
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }


  open(id: number): void {
    // this.location.go(`/post/${id}`);
    window.location.href = `/post/${id}`;
  }
}
