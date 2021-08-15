import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Book } from '../models/book';

import { AuthService } from '../services/auth.service';
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
  displayNotFound: boolean = false;
  userId: number = 0;
  posterId: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.getBook();
    this.userId = this.authService.getUserId();
  }

  getBook(): void {
    this.bookId = String(this.route.snapshot.paramMap.get('bookId'));
    this.bookService.getBook(this.bookId)
      .subscribe(book => {
        console.log("book from getBook:", book);
        
        if(book == undefined) {
          this.displayNotFound = true;
        } else {
          this.book = book;
          this.genres = this.book.genres.split(',');
          this.description = this.book.description.replace(/\\n/g,'<br/><br/>');
          this.posterId = this.book.userId;
        }
      });
  }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }

  onDeleteBook(): void {
    this.bookService.deleteBook(this.bookId, this.userId)
      .subscribe(val => {
        console.log("deleted book!");
        console.log("val:", val);
      })
  }

  onSuccessClose(): void {
    this.router.navigate(['/']);
  }
}
