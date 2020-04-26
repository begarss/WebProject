import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Observable} from "rxjs";
import {Post} from '../models';
import {PostService} from '../post.service';
import {Location} from '@angular/common';
import {Category} from '../models';
import {CategoriesService} from '../categories.service';
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  @Input() post:Post;

  allClicked :boolean;
  postClicked:boolean;
  posts: Post[] = [];
  categories: Category[];
  thumb = faThumbsUp;
  thumbD = faThumbsDown;
  category: Category;
  constructor(private postService: PostService, private location: Location, private categoriesService: CategoriesService,private userService:UserService) { }
  LoginStatus$ : Observable<boolean>;
  IsAdmin$ : Observable<boolean>;
  ngOnInit(): void {
    this.LoginStatus$ = this.userService.isLoggesIn;
    this.IsAdmin$ = this.userService.currentUserIsAdmin;
    this.getPosts();
    this.getCategories();
    this.allClicked =true;

  }

  all() {
      this.allClicked=true;
  }




  getCategories(): void {
    this.categoriesService.getCategories().subscribe(cat => this.categories = cat);
  }

  // getCategoryName(id: number): string {
  //   this.categoriesService.getCategory(id).pipe();
  //   return this.category.name;
  // }

  getPosts(): void {
    this.postService.getAllPosts().subscribe(posts => this.posts = posts);
  }

  open(id: number): void {
    // this.location.go(`/post/${id}`);
    window.location.href = `/post/${id}`;
  }
  title: string;
  description = '';
  UserId$ : string;
  category_id: number;
  is_published:boolean;
  toNumber() {
    this.category_id = +this.category_id;
    console.log(this.category_id);
  }
  publ():void{
    if(this.post.is_published==false){
      this.post.is_published=true;
    }else
      this.post.is_published=false;

  }
  edit(title:string,description:string,category_id:number,author_id:number,is_published:boolean,id:number): void {

    this.postService.EditPost(new Post(title,description,category_id,author_id,is_published),id)
      .subscribe(post => {
        this.posts.push(post);


      });
  }

  getPost(id:number){
    this.postService.getPost(id)
      .subscribe(post => this.post = post);
    this.postClicked=true;
    this.allClicked=false;
  }
  deletePost(id:number){
    this.postService.deletePost(id).subscribe(data=>{
      window.location.reload();
    });
  }
  Number(UserId: string) {
    return +UserId;
  }
}
