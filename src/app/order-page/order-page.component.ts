import { Component, OnInit,ViewChild } from '@angular/core';
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
sell_orders : any;
buy_orders : any;
customOrder1Left = "0"; 
customOrder2Left = "100vw"; 
customOrder3Left = "200vw"; 
  ngOnInit() {
  	 this.orbHeight =  "80%";
      this.orbWidth = "auto";
      this.getOrders();
  }
closeSelf(){

	this.dataService.maincontroller.showOrderPage = false;
}


getSellPrice(){



}
getOrbInfo(){
return  "availability 199";
}
getOrbLock(){
	return "";
}
move(){
	 this.customOrder1Left = "-100vw";
	  this.customOrder2Left = "0";
}
getOrders(){
this.dataService.maincontroller.selectedKey = "SATOSHICARD";
this.dataService.maincontroller.currentCurrency = "BITCRYSTALS";
this.dataService.maincontroller.currentAbrev = "BCY";
		 this.httpService.getOrders( this.dataService.maincontroller.selectedKey, this.dataService.maincontroller.currentCurrency).subscribe(
     data => { 
          	console.log("got orders"+JSON.stringify(data)+" "+this.dataService.maincontroller.currentCurrency);

          this.sell_orders = this.dataService.maincontroller.marge(data.ask, 'sell');
  this.sell_orders =   this.sell_orders.slice(0,3);

				this.buy_orders = this.dataService.maincontroller.marge(data.bid, 'buy');
				  this.buy_orders =   this.buy_orders.slice(0,3);
					if(this.dataService.maincontroller.currentOrbs != null){
					var theORB = this.dataService.maincontroller.currentOrbs[this.dataService.maincontroller.selectedKey];
						if (this.buy_orders.length > 0) {

						  
						 if(theORB != null){
								theORB["bestBuyPrice"] = this.buy_orders[0].price;
						 }
							 
						} 

						if (this.sell_orders.length > 0) {
						  if(theORB != null){
									theORB["bestSellPrice"] = this.sell_orders[0].price;
							 }
						} 
								}

						//this.dataService.maincontroller.currentOrbs[this.dataService.maincontroller.selectedKey]["openOrders"] = this.sell_orders.length + this.buy_orders.length;
						 

      },   
      error => {
      	console.log("get orders"+JSON.stringify(error));
 			 
      },
     () => {});




}

}
