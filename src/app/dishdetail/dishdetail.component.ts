
import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DatePipe } from '@angular/common';
import { DishService } from '../services/dish.service';
import 'rxjs/add/operator/switchMap';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from '../shared/comment';

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
  feedbackForm: FormGroup;
  comment: Comment;
  errMess: string;
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { 
      this.createForm();
    }

    createForm() {
      this.feedbackForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2)] ],
        feedback: ['', [Validators.required] ],
        rating: '',
        date: ''
      });
      this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  
    this.onValueChanged(); // (re)set validation messages now
    }


    onValueChanged(data?: any) {
      if (!this.feedbackForm) { return; }
      const form = this.feedbackForm;
      for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }

    onSubmit() {
      this.comment = {
        rating: this.feedbackForm.value.rating,
        comment: this.feedbackForm.value.feedback,
        author: this.feedbackForm.value.author,
        date: new Date().toISOString()
      };
      console.log(this.comment);
      this.dish.comments.push(this.comment);
      this.feedbackForm.reset({
        author: '',
        rating: '5',
        feedback: '',
        date: ''
      });
    }

  ngOnInit() {
    // let id = +this.route.snapshot.params['id'];
    // this.dishservice.getDish(id).subscribe(dish => this.dish = dish);
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
      errmess => this.errMess = <any>errmess);
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
  formErrors = {
    'author': '',
    'feedback': ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'First Name must be at least 2 characters long.'
    },
    'feedback': {
      'required':      'Comment is required.',
      
    },
  };

}

