import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingsCellComponent } from './rankings-cell.component';

describe('RankingsCellComponent', () => {
  let component: RankingsCellComponent;
  let fixture: ComponentFixture<RankingsCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RankingsCellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingsCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*
    it('should create', () => {
    expect(component).toBeTruthy();
    });
    */
});
