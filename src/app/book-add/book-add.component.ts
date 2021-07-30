import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  // submitForm = new EventEmitter();

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: [''],
    isbn: [''],
    publisher: [''],
    published: [''],
    description: [''],
    genres: this.fb.array([
      this.fb.control('')
    ]),
    imageUrl: ['']
  });

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.bookForm.value);
    
    this.bookForm.value.genres.forEach((genre: any) => {
      genre.toLowerCase();
      genre.split(' ').join('-');
    });

    for(let i = 0; i < this.bookForm.value.genres.length; i++) {
      this.bookForm.value.genres[i] = this.bookForm.value.genres[i].replace(/\s+/g, '-').toLowerCase();
    }
    
    console.log(this.bookForm.value.genres);

    // this.bookService.addBook(this.bookForm.value)
    //   .subscribe(val => {
    //     console.log("added book!");
    //     console.log(val);
    //   });
  }

  get genres() {
    return this.bookForm.get('genres') as FormArray;
  }

  addGenre() {
    this.genres.push(this.fb.control(''));
  }

  updateBook(): void {
    this.bookForm.patchValue({
      title: "Hi World",
    });
  }
}
