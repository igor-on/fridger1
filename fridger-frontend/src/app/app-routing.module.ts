import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { NgModule } from "@angular/core";
import { RecipeDetailsComponent } from "./components/recipe-details/recipe-details.component";
import { RecipeFormComponent } from "./components/recipe-form/recipe-form.component";


const routes: Routes = [
    { path: '', component: RecipesComponent, pathMatch: 'full' },
    { path: 'recipe-details/:id', component: RecipeDetailsComponent },
    { path: 'recipe-form', component: RecipeFormComponent },
    { path: 'recipe-form/:id', component: RecipeFormComponent }
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
