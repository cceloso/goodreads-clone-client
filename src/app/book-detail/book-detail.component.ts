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
      .subscribe(books => {
        this.book = books[0];
        this.genres = this.book.genres.split(',');
        console.log(this.genres);
      });
  }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }

}
