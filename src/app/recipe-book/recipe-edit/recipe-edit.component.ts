import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;

  formFields = [
    {
      name: 'name',
      title: 'Enter the name',
      type: 'text'
    },
    {
      name: 'imgPath',
      title: 'Add image path',
      type: 'text'
    }
  ];

  recipeForm: FormGroup;

  clickedRecipe: Recipe;

  constructor( private route: ActivatedRoute , private recipeService: RecipeService, private router: Router, private dataStorage: DataStorageService) { }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] ? true : false;
      this.clickedRecipe = this.recipeService.getRecipe(this.id-1);
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipePath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipeName = this.clickedRecipe.name;
      recipePath = this.clickedRecipe.imagePath;
      recipeDesc = this.clickedRecipe.description;
      if (this.clickedRecipe['ingredients']) {
        for (const ing of this.clickedRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.weight, [
                Validators.required,
                Validators.pattern(/^[0-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imgPath': new FormControl(recipePath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls; 
  }

  saveForm() {
    if (this.recipeForm.valid) {

      if ( this.editMode ) {
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        console.log(this.editMode);
      } else {
        this.recipeService.addNewRecipe(
          new Recipe(
            this.recipeForm.value.name, 
            this.recipeForm.value.description, 
            this.recipeForm.value.imgPath,
            this.recipeForm.value.ingredients
            )
        );
      }
      this.dataStorage.onSaveData().subscribe();
    } else {
      return false;
    }
  }
  cancelForm() {
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }
  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]+[0-9]*$/),
        ])
      })
    )
  }

  deleteIng(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
