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


});


