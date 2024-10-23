import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeItemComponent } from './fridge-item.component';

describe('FridgeItemComponent', () => {
  let component: FridgeItemComponent;
  let fixture: ComponentFixture<FridgeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FridgeItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FridgeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
