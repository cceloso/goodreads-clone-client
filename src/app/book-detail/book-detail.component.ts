import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book?: Book;
  bookId: string = "";
  genres: string[] = [];
  description: string = "";
  readMore: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    this.bookId = String(this.route.snapshot.paramMap.get('bookId'));
    this.bookService.getBook(this.bookId)
      .subscribe(book => {
        console.log("book from getBook:", book);
        this.book = book;
        this.genres = this.book.genres.split(',');
        this.description = this.book.description.replace(/\\n/g,'<br/><br/>');
      });
  }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }

}
