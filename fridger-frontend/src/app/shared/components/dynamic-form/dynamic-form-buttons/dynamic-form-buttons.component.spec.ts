import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormButtonsComponent } from './dynamic-form-buttons.component';

describe('DynamicFormButtonsComponent', () => {
  let component: DynamicFormButtonsComponent;
  let fixture: ComponentFixture<DynamicFormButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicFormButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
