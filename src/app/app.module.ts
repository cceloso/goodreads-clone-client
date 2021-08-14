import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

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
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BooksByAuthorComponent } from './books-by-author/books-by-author.component';
import { ProfileComponent } from './profile/profile.component';
import { ForumsComponent } from './forums/forums.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { ReplyDetailComponent } from './reply-detail/reply-detail.component';
import { ReplyAddComponent } from './reply-add/reply-add.component';
import { TopicAddComponent } from './topic-add/topic-add.component';

import { ChangeGenreFormatPipe } from './books/books.component';
import { BooksListComponent } from './books-list/books-list.component';
import { TopicsByUserComponent } from './topics-by-user/topics-by-user.component';

import { environment } from 'src/environments/environment';
import { NotFoundResourceComponent } from './not-found-resource/not-found-resource.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { RepliesComponent } from './replies/replies.component';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

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
    LoginComponent,
    SearchComponent,
    NotFoundComponent,
    BooksByAuthorComponent,
    ProfileComponent,
    ForumsComponent,
    TopicDetailComponent,
    ReplyDetailComponent,
    ReplyAddComponent,
    TopicAddComponent,
    ChangeGenreFormatPipe,
    BooksListComponent,
    TopicsByUserComponent,
    NotFoundResourceComponent,
    CommentDetailComponent,
    RepliesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
  ],
  exports: [
    ChangeGenreFormatPipe
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
