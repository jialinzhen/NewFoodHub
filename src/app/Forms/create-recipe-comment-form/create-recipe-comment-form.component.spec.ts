import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipeCommentFormComponent } from './create-recipe-comment-form.component';

describe('CreateRecipeCommentFormComponent', () => {
  let component: CreateRecipeCommentFormComponent;
  let fixture: ComponentFixture<CreateRecipeCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRecipeCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecipeCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
