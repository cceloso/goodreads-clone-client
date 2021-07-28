import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../models/book';
import { BookData } from '../models/book-data';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  // books: Book[] = [];
  book?: Book;
  genres: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const bookId = String(this.route.snapshot.paramMap.get('bookId'));
    this.bookService.getBook(bookId)
      .subscribe(books => {
        this.book = books[0];
        this.genres = this.book.genres.split(',');
        console.log(this.genres);
      });
  }

}
