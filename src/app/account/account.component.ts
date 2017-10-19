import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
declare var QRious:any;
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public dataService:DataService) { }

  ngOnInit() {
  	 var qr = new QRious({
          element: document.getElementById('qr1'),
          value: this.dataService.maincontroller.currentAddress,
          size:240
        });
  }

}
