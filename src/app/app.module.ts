import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {CategoryComponent} from './category/category.component';
import {CategoryListComponent} from './category-list/category-list.component';
import {PostListComponent} from './post-list/post-list.component';
import {AddComplaintComponent} from './add-complaint/add-complaint.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EllipsisModule} from 'ngx-ellipsis';
import { PostDetailComponent } from './post-detail/post-detail.component';
import {AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CategoryComponent,
    CategoryListComponent,
    PostListComponent,
    AddComplaintComponent,
    PostDetailComponent,
    PostListComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,


    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}),
    EllipsisModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
