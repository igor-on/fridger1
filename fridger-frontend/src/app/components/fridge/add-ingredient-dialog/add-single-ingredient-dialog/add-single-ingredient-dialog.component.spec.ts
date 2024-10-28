import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSingleIngredientDialogComponent } from './add-single-ingredient-dialog.component';

describe('AddSingleIngredientDialogComponent', () => {
  let component: AddSingleIngredientDialogComponent;
  let fixture: ComponentFixture<AddSingleIngredientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSingleIngredientDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSingleIngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
