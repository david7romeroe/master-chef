import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('f', {static: false}) slForm: NgForm;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {

    this.subscription = this.slService.startEditing.subscribe((index:number)=>{

      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);

      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onAddItem(form: NgForm) {

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else {

      this.slService.addIngredient(newIngredient);
    }

    this.editMode = false;
    form.reset();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
