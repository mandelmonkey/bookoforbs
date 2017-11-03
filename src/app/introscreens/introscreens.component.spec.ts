import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroscreensComponent } from './introscreens.component';

describe('IntroscreensComponent', () => {
  let component: IntroscreensComponent;
  let fixture: ComponentFixture<IntroscreensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroscreensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroscreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
