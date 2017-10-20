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
          size:this.getQRSize()
        });
  }

  getQRSize(){
  	var screenHeight = document.documentElement.clientHeight;
  	var screenWidth= document.documentElement.clientWidth;

  	if(screenHeight > screenWidth){
  		return screenWidth * 0.8;
  	}else{
  		return screenHeight * 0.5;
  	}

  }
  getAddress(){
  	if(this.dataService.maincontroller.currentAddress == "empty"){
  			return "no address";
  	}
  	return this.dataService.maincontroller.currentAddress;
  }

}
