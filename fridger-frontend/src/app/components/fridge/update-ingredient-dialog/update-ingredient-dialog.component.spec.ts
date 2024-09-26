import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIngredientDialogComponent } from './update-ingredient-dialog.component';

describe('UpdateIngredientDialogComponent', () => {
  let component: UpdateIngredientDialogComponent;
  let fixture: ComponentFixture<UpdateIngredientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateIngredientDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateIngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
