import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BooksComponent,
    BookDetailComponent,
    ReviewsComponent,
    CommentsComponent,
    BooksByGenreComponent,
    BookAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
