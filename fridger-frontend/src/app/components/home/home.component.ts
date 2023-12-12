import { Component, OnInit } from '@angular/core';
import { GroceriesList } from 'src/app/common/groceriesList';
import { Recipe } from 'src/app/common/recipe';
import { GroceriesService } from 'src/app/services/groceries.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
    '../recipes-list/recipes-list.component.scss',
  ],
})
export class HomeComponent implements OnInit {
  groceriesList: GroceriesList[] = [];
  favoriteRecipes: Recipe[] = [];

  constructor(
    private groceriesService: GroceriesService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.groceriesService.getGroceriesList().subscribe(res => {
      console.log('getGroceriesList');
      console.log(res);
      this.groceriesList = res.data;
    });

    this.recipeService.getFavoriteRecipes().subscribe(res => {
      console.log('getFavortieRecipes');
      console.log(res);
      this.favoriteRecipes = res.data;
    });
  }
}
