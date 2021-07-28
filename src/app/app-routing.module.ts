import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books/:bookId', component: BookDetailComponent },
  { path: 'books?genre=:genreName', component: BooksComponent },
  { path: 'books/:bookId/reviews', component: ReviewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
