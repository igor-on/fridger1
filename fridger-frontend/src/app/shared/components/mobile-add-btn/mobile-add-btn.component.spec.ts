import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAddBtnComponent } from './mobile-add-btn.component';

describe('MobileAddBtnComponent', () => {
  let component: MobileAddBtnComponent;
  let fixture: ComponentFixture<MobileAddBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAddBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileAddBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
