import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-not-found-resource',
  templateUrl: './not-found-resource.component.html',
  styleUrls: ['./not-found-resource.component.css']
})
export class NotFoundResourceComponent implements OnInit {
  @Input() resource: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
