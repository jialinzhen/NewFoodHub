import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipeCommentFormComponent } from './edit-recipe-comment-form.component';

describe('EditRecipeCommentFormComponent', () => {
  let component: EditRecipeCommentFormComponent;
  let fixture: ComponentFixture<EditRecipeCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecipeCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecipeCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
