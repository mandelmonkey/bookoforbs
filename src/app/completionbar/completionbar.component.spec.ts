import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionbarComponent } from './completionbar.component';

describe('CompletionbarComponent', () => {
  let component: CompletionbarComponent;
  let fixture: ComponentFixture<CompletionbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletionbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
