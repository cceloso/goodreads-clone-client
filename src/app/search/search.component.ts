import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../models/book';
import { BookService } from '../services/book.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchParam: string = "";
  books: Book[] = [];

  currentPage: number = 1;
  maxPage: number = 1;
  pages: number[] = [];
  booksToDisplayCount: number = 12;
  booksToDisplay: Book[] = [];

  apiUrl: string = environment.apiUrl;
  startingUrl: string = `${this.apiUrl}/public/images/books`;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(queryParams => {
      this.searchParam = String(this.route.snapshot.queryParams.q);
      this.searchBooks(this.searchParam);
    })
  }

  searchBooks(searchParam: string): void {
    this.bookService.searchBooks(searchParam)
    .subscribe(books => {
      this.books = books;
      this.booksToDisplay = this.books.slice(0, this.booksToDisplayCount);
      this.maxPage = Math.ceil(this.books.length / this.booksToDisplayCount);
      this.pages = Array.from(Array(this.maxPage),(x,i)=>i+1);
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
