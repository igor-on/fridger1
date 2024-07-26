import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { ColorsDirective } from './shared/directives/colors.directive';
import { AppRoutingModule } from './app-routing.module';
import {
  ConfirmDialogComponent,
  RecipeDetailsComponent,
} from './components/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeCalendarComponent } from './components/recipe-calendar/recipe-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddEventDialogComponent } from './components/recipe-calendar/add-event-dialog/add-event-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { GroceriesListComponent } from './components/groceries-list/groceries-list.component';
import { HomeComponent } from './components/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { LoginComponent } from './components/login/login.component';
import { FridgeComponent } from './components/fridge/fridge.component';

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
    GroceriesListComponent,
    HomeComponent,
    ConfirmDialogComponent,
    LoginComponent,
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
    MatTableModule,
    MatSidenavModule,
    SkeletonModule,
    ToastModule,
    FridgeComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { position: { top: '15rem' } },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
