
import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  providers: [DatePipe]
})
export class DishdetailComponent implements OnInit {

  @Input()
  dish : Dish;

  constructor() {    
  }

  ngOnInit() {
  }

}

