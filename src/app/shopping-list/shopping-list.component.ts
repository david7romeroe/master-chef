import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[] = [{ name:"Apple", amount: 12 }, {name:"Tomates", amount: 12}];

  constructor() { }

  ngOnInit(): void {
  }

}
