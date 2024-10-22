import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
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
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
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
import { MatIconModule } from '@angular/material/icon';
import { ListItemComponent } from './shared/components/list/list-item/list-item.component';
import { SharedModule } from './shared/shared.module';
import { ListComponent } from './shared/components/list/list.component';
import { DynamicFormComponent } from './shared/components/dynamic-form/dynamic-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarMobileComponent } from './components/sidebar-mobile/sidebar-mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    SidebarComponent,
    RecipesListComponent,
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
    MatIconModule,
    ListItemComponent,
    ListComponent,
    SharedModule,
    DynamicFormComponent,
    MatMenuModule,
    NavbarComponent,
    SidebarMobileComponent,
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
    provideAnimations(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
