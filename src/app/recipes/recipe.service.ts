import { Recipe } from './recipe';
import { EventEmitter } from '@angular/core';


export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [{
      name: "Receta 1",
      description: "pasta 1",
      imagePath: "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg",
      ingredients: [{name: "salsa", amount: 3}]
    },{
      name: "Receta 2",
      description: "pasta 2",
      imagePath: "https://static01.nyt.com/images/2020/02/10/dining/onepot-cheesypasta/onepot-cheesypasta-articleLarge.jpg",
      ingredients: [{name: "salsa", amount: 3}]
    }];

    getRecipe() {
        return this.recipes.slice(); // get recipe list from outside
    }
}
