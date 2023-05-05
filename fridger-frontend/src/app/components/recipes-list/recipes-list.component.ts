import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, filter } from 'rxjs';
import { Recipe } from 'src/app/common/recipe';
import { MessageService } from 'src/app/services/message.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  globalFilter: FormControl = new FormControl('');


  recipes: Recipe[] = [];

  message: string = '';
  messageSubscription?: Subscription;

  constructor(private recipeService: RecipeService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.handleMessages();
    this.handleRecipes();

    this.globalFilter.valueChanges.subscribe(() => {
      this.getGlobalFilteredRecipes()
    })
  }

  handleMessages() {
    this.messageSubscription = this.messageService.message.subscribe(newMessage => this.message = newMessage);
  }

  handleRecipes() {
    this.recipeService.getRecipes().subscribe(
      response => {
        this.recipes = response;
        // console.log(`Recipes arrived: ${JSON.stringify(this.recipes)}`)
      }
    )
  }

  getGlobalFilteredRecipes() {
    const filterText = this.globalFilter.value;

    return this.globalFilter.value == null || this.globalFilter.value === ''
    ? this.recipes
    : this.recipes.filter(recipe => this._filterPredicate(recipe, filterText));
  }

  private _filterPredicate(data: Recipe, filter: string): boolean {
    const nameIncludes = data.name.includes(filter);
    const linkIncludes = data.link.includes(filter);
    const descriptionIncludes = data.description.includes(filter);
    const ingredientIncludes = data.recipeIngredients
                                          .map(ri => ri.ingredient)
                                          .filter(i => i.name.includes(filter))
                                          .length > 0;

    return nameIncludes || linkIncludes || descriptionIncludes || ingredientIncludes;
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
  }
}
