import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {AddComplaintComponent} from './add-complaint/add-complaint.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {CategoryListComponent} from './category-list/category-list.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'post/:id', component: PostDetailComponent},
  {path: 'add', component: AddComplaintComponent},
  { path: 'categoryPostsList/:id', component: CategoryListComponent },

  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
