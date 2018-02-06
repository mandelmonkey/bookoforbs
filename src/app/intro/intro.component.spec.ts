import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../services/data.service';
import { IntroComponent } from './intro.component';
import { IntroscreensComponent } from '../introscreens/introscreens.component';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { HTTPService } from "../services/http.service";

import { PersistenceService, StorageType } from 'angular-persistence'
declare var Mnemonic: any;
describe('IntroComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      declarations: [IntroComponent, IntroscreensComponent],
      providers: [DataService, HTTPService, PersistenceService]
    })
      .compileComponents();
  }));

  it(`It should generate address from recovery phrase`, async(() => {
    const fixture = TestBed.createComponent(IntroComponent);
    const app = fixture.debugElement.componentInstance;
    var words = "guitar pay throughout blank enjoy relationship flame work smoke tease football inside".split(' ');
    var m = new Mnemonic(words);
    expect(app.createAddressFromPassphrase(m)).toEqual('14JRsWbBapWRC6HMDU2mx5XW9VL1rGtB6p');
  }));



});


