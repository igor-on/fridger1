import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/common/recipe';
import { MessageService } from 'src/app/services/message.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  
  recipe?: Recipe;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private messageService: MessageService) {}
  
  ngOnInit(): void {
    this.handleRecipe();
  }
  
  handleRecipe() {
    const recipeId = this.route.snapshot.paramMap.has("id") ? this.route.snapshot.paramMap.get('id') : "0";
    
    this.recipeService.getRecipeDetails(recipeId!).subscribe(
      response => {
        this.recipe = response;
        console.log(`Recipe arrived: ${JSON.stringify(this.recipe)}`)
      }
      )
    }
    
    onDelete() {
      this.recipeService.deleteRecipe(this.recipe!.id).subscribe(response => {
        console.log(response)
        this.router.navigate(['/'])
        this.messageService.sendMessage(response.message);
      });
    }

}
