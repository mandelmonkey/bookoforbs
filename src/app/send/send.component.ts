import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  constructor(public dataService:DataService) { }
  public amount:string;
  public currentORB:string;
  ngOnInit() {
  	this.amount = "";
  }

  closeSend(){
  	this.dataService.maincontroller.showSend = false; 
  }
  addKey(num:string){
  	if(num == "-1"){
  		this.amount = this.amount.slice(0, -1);
  	}else{
  		this.amount = this.amount+num;
  	}
  	
  }

}
