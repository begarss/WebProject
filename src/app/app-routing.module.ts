import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {AddComplaintComponent} from './add-complaint/add-complaint.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {CategoryListComponent} from './category-list/category-list.component';

import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {SigninComponent} from './signin/signin.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'post/:id', component: PostDetailComponent},
  {path: 'add', component: AddComplaintComponent},
  { path: 'categoryPostsList/:id', component: CategoryListComponent },

  {path: 'about', component: AboutComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
