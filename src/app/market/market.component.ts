import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
   providers:[HTTPService],
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
 newOrbs : Array<any>;
  currentOrbs  : Array<any>;
  scrollHeight:string;
   
 constructor(public dataService:DataService,private httpService:HTTPService) {
 	dataService.market = this;
 }

  ngOnInit() {

 	 

  }

 
getSellPrice(token:string){
	return 'Sell\n100 BCY';

}
getMarketHeight(){
	return (document.documentElement.clientHeight-document.getElementById("market").offsetTop-55)+"px"; 
}
  setMarketData(){
  	 
  	 this.newOrbs = Object.keys(this.dataService.maincontroller.currentOrbs).slice(0,10);

  	 
  }
 getImage(obj:any){

    return obj.image;
  }

}
