import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCalendarComponent } from './recipe-calendar.component';

describe('RecipeCalendarComponent', () => {
  let component: RecipeCalendarComponent;
  let fixture: ComponentFixture<RecipeCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
