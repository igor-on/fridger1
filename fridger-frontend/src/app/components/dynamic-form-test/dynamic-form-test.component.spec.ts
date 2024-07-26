import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormTestComponent } from './dynamic-form-test.component';

describe('DynamicFormTestComponent', () => {
  let component: DynamicFormTestComponent;
  let fixture: ComponentFixture<DynamicFormTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
