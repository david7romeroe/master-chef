import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient';

export class ShoppingListService {

    ingredients:Ingredient[] = [];
    ingredientAdded = new EventEmitter<Ingredient>();

}