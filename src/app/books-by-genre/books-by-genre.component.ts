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
  @Input() inputParams?: any;
  genreName: string = "";
  inHomepage: boolean = true;
  books: Book[] = [];
  totalBooks: number = 0;
  displayElementsForGenrePage: boolean = true;

  currentPage: number = 1;
  maxPage: number = 1;
  pages: number[] = [];
  booksToDisplayCount: number = 18;
  booksToDisplay: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.genreName = this.inputParams.genreName;
    this.inHomepage = this.inputParams.inHomepage;
    if(this.genreName == "") {
      this.route.queryParams
      .subscribe(queryParams => {
        this.genreName = String(this.route.snapshot.queryParams.genre);
        this.getBooksByGenre(true);
        this.displayElementsForGenrePage = false;
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
        this.booksToDisplay = this.books.slice(0, 6);
      } else {
        this.booksToDisplay = this.books.slice(0, this.booksToDisplayCount);
        this.maxPage = Math.ceil(this.books.length / this.booksToDisplayCount);
        this.pages = Array.from(Array(this.maxPage),(x,i)=>i+1);
      }
    });
  }

  onSelectPage(page: number): void {
    if(page < 1 || page > this.maxPage) {
      return;
    }

    this.currentPage = page;
    this.booksToDisplay = this.books.slice((this.currentPage - 1) * this.booksToDisplayCount, this.currentPage * this.booksToDisplayCount);
  }
}
