import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id: number): Promise<Promotion> {
    return new Promise(resolve=>{
      
    });
    // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve=>{
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    });
    //return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }


}