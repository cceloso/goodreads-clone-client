import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { BookService } from '../services/book.service';

import { Genre } from '../models/genre';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  allGenres: Genre[] = [];
  addResultHeading: string = "";
  addResultMessage: string = "";

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    publisher: [''],
    published: [''],
    isbn: [''],
    description: ['', Validators.required],
    // genres: this.fb.array([
    //   this.fb.control('')
    // ]),
    genres: this.fb.array([]),
    imageUrl: ['']
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.getGenres();
  }

  get genres() {
    return this.bookForm.get('genres') as FormArray;
  }

  // addGenre() {
  //   this.genres.push(this.fb.control(''));
  // }

  onSubmit(): void {
    console.log("just submitted");
    console.log(this.bookForm.value);
    
    console.log("genres after formatting is changed:", this.bookForm.value.genres);
    
    this.bookService.addBook(this.bookForm.value)
      .subscribe(val => {
        console.log("added book!");
        console.log("val:", val);
        if(val == undefined) {
          this.addResultHeading = "Error";
          this.addResultMessage = "Book was not added. Book with that title and author already exists."
        } else {
          this.addResultHeading = "Success";
          this.addResultMessage = "Book was successfully added!";
          this.onClose();
        }
      });
  }

  onSuccessClose(): void {
    // window.location.reload();
  }

  onClose(): void {
    this.bookForm.patchValue({
      title: '',
      author: '',
      publisher: '',
      published: '',
      isbn: '',
      imageUrl: '',
      description: ''
    });

    this.genres.clear();
  }

  getGenres(): void {
    this.bookService.getGenres()
    .subscribe(genres => {
      this.allGenres = genres;
    });
  }

  onCheckChange(event: any) {
    const formArray: FormArray = this.bookForm.get('genres') as FormArray;
    
    // Selected
    if(event.target.checked) {
      // Add a new control in the formArray
      formArray.push(new FormControl(event.target.value));
    
    }

    else {
      let i: number = 0;

      formArray.controls.forEach((ctrl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }

    console.log("updated genres:", this.bookForm.value.genres);
  }
}
