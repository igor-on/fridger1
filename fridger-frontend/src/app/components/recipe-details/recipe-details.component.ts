import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe';
import { MessageService } from 'src/app/services/message.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe?: Recipe;
  recipeLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.handleRecipe();
  }

  handleRecipe() {
    const recipeId = this.route.snapshot.paramMap.has('id')
      ? this.route.snapshot.paramMap.get('id')
      : '0';

    this.recipeLoading = true;
    this.recipeService.getRecipeDetails(recipeId!).subscribe(response => {
      this.recipe = response;
      console.log(`Recipe arrived: ${JSON.stringify(this.recipe)}`);
      this.recipeLoading = false;
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(continuee => {
      if (continuee) {
        this.recipeService.deleteRecipe(this.recipe!.id).subscribe(response => {
          console.log(response);
          this.router.navigate(['/recipes']);
          this.messageService.sendMessage(response.message!);
        });
      }
    });
  }
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {}
