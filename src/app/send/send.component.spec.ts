import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../services/data.service';
import { SendComponent } from './send.component';
import { FeeSelectorComponent } from '../fee-selector/fee-selector.component';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { HTTPService } from "../services/http.service";

import { PersistenceService, StorageType } from 'angular-persistence'
declare var Mnemonic: any;
/*
describe('SendComponent', () => {
  let component: SendComponent;
  let fixture: ComponentFixture<SendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      declarations: [SendComponent, FeeSelectorComponent],
      providers: [DataService, HTTPService, PersistenceService]
    })
      .compileComponents();
  }));

  it('tosign data should be', async(() => {
    const fixture = TestBed.createComponent(SendComponent);
    // fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    spyOn(app, "send").and.returnValue(Promise.resolve(true));


    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(app.monkey).toEqual('monkey!');
    });


  }));





});

*/

