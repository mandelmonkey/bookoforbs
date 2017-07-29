import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  providers:[HTTPService],
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

 constructor(public dataService:DataService,private httpService:HTTPService) { }
orbHeight = "";
orbWidth = "";
  ngOnInit() {
  	 this.orbHeight =  "80%";
      this.orbWidth = "auto";
  }
closeSelf(){

	this.dataService.maincontroller.showOrderPage = false;
}
}
