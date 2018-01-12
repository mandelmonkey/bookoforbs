import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketallComponent } from './marketall.component';

describe('MarketallComponent', () => {
  let component: MarketallComponent;
  let fixture: ComponentFixture<MarketallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
