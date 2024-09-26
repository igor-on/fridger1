import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroceriesComponent } from './add-groceries.component';

describe('AddGroceriesComponent', () => {
  let component: AddGroceriesComponent;
  let fixture: ComponentFixture<AddGroceriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGroceriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGroceriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
