import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../models/book';
import { Genre } from '../models/genre';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books-by-genre',
  templateUrl: './books-by-genre.component.html',
  styleUrls: ['./books-by-genre.component.css']
})
export class BooksByGenreComponent implements OnInit {
  @Input() genreName: string = "";
  books: Book[] = [];
  totalBooks: number = 0;
  displayViewMore: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    if(this.genreName == "") {
      this.route.queryParams
      .subscribe(queryParams => {
        this.genreName = String(this.route.snapshot.queryParams.genre);
        // this.books = [];
        this.getBooksByGenre(true);
        this.displayViewMore = false;
      })
    } else {
      this.getBooksByGenre(false);
    }
  }
  
  getBooksByGenre(displayAll: boolean): void {    
    this.bookService.getBooksByGenre(this.genreName)
    .subscribe(books => {
      this.books = books;
      this.totalBooks = this.books.length;
      if(!displayAll) {
        this.books = this.books.slice(0, 6);
      }
    });
  }
}
