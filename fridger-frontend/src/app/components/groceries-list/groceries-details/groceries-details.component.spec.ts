import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceriesDetailsComponent } from './groceries-details.component';

describe('GroceriesDetailsComponent', () => {
  let component: GroceriesDetailsComponent;
  let fixture: ComponentFixture<GroceriesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroceriesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroceriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
