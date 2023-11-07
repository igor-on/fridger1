import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeCalendarComponent } from './components/recipe-calendar/recipe-calendar.component';
import { recipesResolver } from './recipesResolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: RecipesComponent },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
  { path: 'recipe-form', component: RecipeFormComponent },
  { path: 'recipe-form/:id', component: RecipeFormComponent },
  {
    path: 'calendar',
    component: RecipeCalendarComponent,
    resolve: { recipes: recipesResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
