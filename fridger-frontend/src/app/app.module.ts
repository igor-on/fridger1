import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RecipesListComponent } from "./components/recipes-list/recipes-list.component";
import { ColorsDirective } from "./common/colors.directive";
import { AppRoutingModule } from "./app-routing.module";
import { RecipeDetailsComponent } from "./components/recipe-details/recipe-details.component";
import { RecipeFormComponent } from "./components/recipe-form/recipe-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipeCalendarComponent } from "./components/recipe-calendar/recipe-calendar.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { AddEventDialogComponent } from "./components/recipe-calendar/add-event-dialog/add-event-dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    SidebarComponent,
    RecipesListComponent,
    ColorsDirective,
    RecipeDetailsComponent,
    RecipeFormComponent,
    RecipeCalendarComponent,
    AddEventDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
