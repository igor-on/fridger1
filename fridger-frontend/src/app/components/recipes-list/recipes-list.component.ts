import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Recipe } from 'src/app/common/recipe';
import { MessageService } from 'src/app/services/message.service';

import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  globalFilter: FormControl = new FormControl('');

  recipes: Recipe[] = [];

  recipesLoading = false;

  message: string = '';

  constructor(
    private recipeService: RecipeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.handleRecipes();
  }

  handleRecipes() {
    this.recipesLoading = true;
    this.recipeService.getRecipes().subscribe(response => {
      this.recipes = response;
      this.recipesLoading = false;
      // console.log(`Recipes arrived: ${JSON.stringify(this.recipes)}`)
    });
  }

  getGlobalFilteredRecipes() {
    const filterText = this.globalFilter.value;

    return this.globalFilter.value == null || this.globalFilter.value === ''
      ? this.recipes
      : this.recipes.filter(recipe =>
          this._filterPredicate(recipe, filterText)
        );
  }

  private _filterPredicate(data: Recipe, filter: string): boolean {
    const nameIncludes = data.name.includes(filter);
    const linkIncludes = data.link.includes(filter);
    const descriptionIncludes = data.description.includes(filter);
    const ingredientIncludes =
      data.recipeIngredients
        .map(ri => ri.ingredient)
        .filter(i => i.name.includes(filter)).length > 0;

    return (
      nameIncludes || linkIncludes || descriptionIncludes || ingredientIncludes
    );
  }

  toggleFavorite(recipe: Recipe, event: MouseEvent) {
    event.stopPropagation();
    this.recipeService.toggleFavorite(recipe).subscribe(response => {
      let listRecipe: Recipe | undefined = this.recipes.find(
        r => r.id === recipe.id
      );
      if (listRecipe) {
        listRecipe.favorite = response.data!.favorite;
      }
      this.messageService.sendMessage(
        `Recipe ${listRecipe?.favorite ? 'added to' : 'removed from'} favorites`
      );
    });
  }

  ngOnDestroy(): void {
    // this.messageSubscription?.unsubscribe();
  }
}
