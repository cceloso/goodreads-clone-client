import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../models/book';
import { Genre } from '../models/genre';

import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  genres: Genre[] = [];
  genreName: string = "";
  userId: number = 0;
  currentPage: number = 1;
  maxPage: number = 1;
  pages: number[] = [];
  genresToDisplayCount: number = 4;
  genresToDisplay: Genre[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.route.queryParams
      .subscribe(queryParams => {
        this.genreName = String(this.route.snapshot.queryParams.genre);
        
        if(this.genreName == "all" || this.genreName == "undefined") {
          this.genreName = "All";
        }

        this.getGenres();
      })
  }

  getGenres(): void {
    this.bookService.getGenres()
    .subscribe(genres => {
      this.genres = genres;
      this.genresToDisplay = this.genres.slice(0, this.genresToDisplayCount);
      this.maxPage = Math.ceil(this.genres.length / this.genresToDisplayCount);
      this.pages = Array.from(Array(this.maxPage),(x,i)=>i+1);
    });
  }

  onGenreClick(genreName: string): void {
    // this.genreName = genreName;
  }

  onSelectPage(page: number): void {
    if(page < 1 || page > this.maxPage) {
      return;
    }

    this.currentPage = page;
    this.genresToDisplay = this.genres.slice((this.currentPage - 1) * this.genresToDisplayCount, this.currentPage * this.genresToDisplayCount);
  }
}
