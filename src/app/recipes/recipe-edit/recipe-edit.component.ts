import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeItemComponent } from '../recipe-list/recipe-item/recipe-item.component';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  id: number;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {

      this.id = params['id'];
      this.editMode = params['id'] != null

      this.initForm();
    });

  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients  = new FormArray([]);

    if(this.editMode) {

      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if(recipe['ingredients']) {

        for(let ingredients of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredients.name),
              'amount': new FormControl(ingredients.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name':  new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {

    console.log(this.recipeForm);
    let i =  this.recipeService.getRecipes().length;

    const newRecipe = new Recipe(
      i,
      this.recipeForm.value['name'], 
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredient']);

     if(this.editMode) {
        this.recipeService.updateRecipe(this.id, newRecipe);
     } else {
        this.recipeService.addRecipe(newRecipe);
     }
     
     this.onCancel();
  }

  onDeleteIngredients(index: number) {

    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }

  onAddIngredient() {

    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
    ])
    }));
  }
  onCancel(){

    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
