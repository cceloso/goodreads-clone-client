import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CommentsComponent } from './comments/comments.component';
import { BooksByGenreComponent } from './books-by-genre/books-by-genre.component';
import { BookAddComponent } from './book-add/book-add.component';
import { ReviewAddComponent } from './review-add/review-add.component';
import { CommentAddComponent } from './comment-add/comment-add.component';
import { ReviewsByUserComponent } from './reviews-by-user/reviews-by-user.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BooksComponent,
    BookDetailComponent,
    ReviewsComponent,
    CommentsComponent,
    BooksByGenreComponent,
    BookAddComponent,
    ReviewAddComponent,
    CommentAddComponent,
    ReviewsByUserComponent,
    ReviewDetailComponent,
    DashboardComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
