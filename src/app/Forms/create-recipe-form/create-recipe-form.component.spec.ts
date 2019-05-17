import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipeFormComponent } from './create-recipe-form.component';

describe('CreateRecipeFormComponent', () => {
  let component: CreateRecipeFormComponent;
  let fixture: ComponentFixture<CreateRecipeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRecipeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
