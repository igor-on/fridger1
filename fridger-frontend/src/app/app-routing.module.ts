import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeCalendarComponent } from './components/recipe-calendar/recipe-calendar.component';
import { recipesResolver } from './recipes-resolver';
import { GroceriesListComponent } from './components/groceries-list/groceries-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth-guard';
import { DynamicFormTestComponent } from './components/dynamic-form-test/dynamic-form-test.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  { path: 'recipes', component: RecipesComponent, canActivate: [authGuard] },
  {
    path: 'recipe-details/:id',
    component: RecipeDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'recipe-form',
    component: RecipeFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'recipe-form/:id',
    component: RecipeFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'calendar',
    component: RecipeCalendarComponent,
    resolve: { recipes: recipesResolver },
    canActivate: [authGuard],
  },
  {
    path: 'groceries',
    component: GroceriesListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'fridge',
    loadComponent: () =>
      import('./components/fridge/fridge.component').then(mod => {
        return mod.FridgeComponent;
      }),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
