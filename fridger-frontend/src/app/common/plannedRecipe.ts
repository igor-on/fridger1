export interface PlannedRecipe {
  id?: number;
  plannedDate: string;
  recipe: {
    id: number;
    name?: string;
  };
  done: boolean;
}
