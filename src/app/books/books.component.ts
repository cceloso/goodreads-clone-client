import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../models/book';
import { Genre } from '../models/genre';
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
  pages: number = 1;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(queryParams => {
        this.genreName = String(this.route.snapshot.queryParams.genre);
        
        if(this.genreName == "all" || this.genreName == "undefined") {
          this.genreName = "All";
        }

        // this.books = [];
        this.getGenres();
      })
  }

  getGenres(): void {
    this.bookService.getGenres()
    .subscribe(genres => {
      this.genres = genres;
      this.pages = Math.ceil(genres.length / 4);
    });
  }

  onGenreClick(genreName: string): void {
    // this.genreName = genreName;
  }
}
