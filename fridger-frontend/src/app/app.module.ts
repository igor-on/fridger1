import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { ColorsDirective } from './common/colors.directive';
import { AppRoutingModule } from './app-routing.module';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    SidebarComponent,
    RecipesListComponent,
    ColorsDirective,
    RecipeDetailsComponent,
    RecipeFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
