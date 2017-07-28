import { Component, OnInit, Input } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
   providers:[HTTPService],
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
 @Input() token: string;
 public buyPrice:string;
 public sellPrice:string;
 constructor(public dataService:DataService,private httpService:HTTPService) {
 	 
 }
 
getPrice(){
	if(typeof this.dataService.maincontroller.currentOrbs[this.token]["bestBuyPrice"] != "undefined" ){
this.buyPrice = "sell\n"+this.dataService.maincontroller.currentOrbs[this.token]["bestBuyPrice"] + " "+this.dataService.maincontroller.currentAbrev;
		 if(typeof this.dataService.maincontroller.currentOrbs[this.token]["bestSellPrice"] != "undefined" ){
			this.sellPrice = "buy\n"+this.dataService.maincontroller.currentOrbs[this.token]["bestSellPrice"] + " "+this.dataService.maincontroller.currentAbrev;
		}else{
			this.sellPrice = "-";
		}
	}else{
	 this.httpService.getOrders(this.token, this.dataService.maincontroller.currentCurrency).subscribe(
     data => { 
          
          var sell_orders = this.dataService.maincontroller.marge(data.ask, 'sell');

						var buy_orders = this.dataService.maincontroller.marge(data.bid, 'buy');

						if (buy_orders.length > 0) {

						 
								
							this.buyPrice = "sell\n"+buy_orders[0].price + " "+this.dataService.maincontroller.currentAbrev;
								
								this.dataService.maincontroller.currentOrbs[this.token]["bestBuyPrice"] = buy_orders[0].price;
							
								
							 
							

						}else{
							this.buyPrice = "-";
						}

						if (sell_orders.length > 0) {
						 
									this.sellPrice = "buy\n"+sell_orders[0].price + " "+this.dataService.maincontroller.currentAbrev;
								this.dataService.maincontroller.currentOrbs[this.token]["bestSellPrice"] = sell_orders[0].price;
							
							 
							

						}else{
							this.sellPrice = "-";
						}


						this.dataService.maincontroller.currentOrbs[this.token]["openOrders"] = sell_orders.length + buy_orders.length;
							

		 
     
      

      },   
      error => {
      	console.log(JSON.stringify(error));
 			this.buyPrice= "error";
      },
     () => {});
	}
 

	 

}
 
  ngOnInit() {
this.getPrice();

  }

}
