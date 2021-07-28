import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../models/book';
import { BookData } from '../models/book-data';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  genreName: string = "";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.genreName = String(this.route.snapshot.queryParams.genre);
    
    if(this.genreName !== "undefined") {
      console.log("get books by genre");
      console.log("genre is", this.genreName)
      this.bookService.getBooksByGenre(this.genreName)
      .subscribe(books => {
        this.books = books;
        // console.log(this.books);
      });
    } else {
      console.log("get all books");
      this.genreName = "All";
      this.bookService.getBooks()
      .subscribe(books => {
        this.books = books;
        // console.log(this.books);
      });
    }
    
  }
}
