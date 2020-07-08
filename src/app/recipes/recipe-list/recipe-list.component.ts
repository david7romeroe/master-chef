import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeItem = new EventEmitter<Recipe>();

  recipes: Recipe[] = [{
    name: "Receta 1",
    description: "pasta 1",
    imagePath: "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg"
  },{
    name: "Receta 2",
    description: "pasta 2",
    imagePath: "https://static01.nyt.com/images/2020/02/10/dining/onepot-cheesypasta/onepot-cheesypasta-articleLarge.jpg"
  }];

  constructor() { }

  ngOnInit(): void {
  }

  selectedRecipe(recipe: Recipe) {

    this.recipeItem.emit(recipe);
  }

}
