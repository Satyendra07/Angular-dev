
import { Component, OnInit} from '@angular/core';
import { Dish } from '../shared/dish';
import { DatePipe } from '@angular/common';
import { DishService } from '../services/dish.service';
import 'rxjs/add/operator/switchMap';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  providers: [DatePipe]
})
export class DishdetailComponent implements OnInit {

  
  dish : Dish;
  dishIds: number[];
  prev: number;
  next: number;
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    // let id = +this.route.snapshot.params['id'];
    // this.dishservice.getDish(id).subscribe(dish => this.dish = dish);
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}

