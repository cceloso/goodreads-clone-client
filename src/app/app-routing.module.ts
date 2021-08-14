import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsByUserComponent } from './reviews-by-user/reviews-by-user.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BooksByAuthorComponent } from './books-by-author/books-by-author.component';
import { ProfileComponent } from './profile/profile.component';
import { ForumsComponent } from './forums/forums.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';

const routes: Routes = [
  // { path: '', component: DashboardComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'books', component: BooksComponent },
  { path: 'books/:bookId', component: BookDetailComponent },
  { path: 'books?genre=:genreName', component: BooksComponent },
  { path: 'books/:bookId/reviews', component: ReviewsComponent },
  // { path: 'reviews', component: ReviewsByUserComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'authors', component: BooksByAuthorComponent },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'users/:userId', component: ProfileComponent },
  { path: 'forums', component: ForumsComponent },
  { path: 'forums/:topicId', component: TopicDetailComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
