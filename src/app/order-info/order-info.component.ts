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
		var price =this.dataService.maincontroller.currentOrbs[this.token]["bestBuyPrice"];
		var fiatPrice = this.dataService.maincontroller.getFiatForToken(this.dataService.maincontroller.currentCurrency,price);
	
this.buyPrice = this.dataService.getLang("sell")+"\n"+price + " "+this.dataService.maincontroller.currentAbrev+"\n"+fiatPrice;
		 if(typeof this.dataService.maincontroller.currentOrbs[this.token]["bestSellPrice"] != "undefined" ){
price = this.dataService.maincontroller.currentOrbs[this.token]["bestSellPrice"];
fiatPrice = this.dataService.maincontroller.getFiatForToken(this.dataService.maincontroller.currentCurrency,price);

			this.sellPrice = this.dataService.getLang("buy")+"\n"+price + " "+this.dataService.maincontroller.currentAbrev+"\n"+fiatPrice;
		}else{
			this.sellPrice = "-";
		}
	}else{
	 this.httpService.getOrders(this.token, this.dataService.maincontroller.currentCurrency).subscribe(
     data => { 
          
          var sell_orders = this.dataService.maincontroller.marge(data.ask, 'sell');

						var buy_orders = this.dataService.maincontroller.marge(data.bid, 'buy');

						if (buy_orders.length > 0) {

						 	var price = buy_orders[0].price;
							 fiatPrice = this.dataService.maincontroller.getFiatForToken(this.dataService.maincontroller.currentCurrency,price);

							this.buyPrice = this.dataService.getLang("sell")+"\n"+price + " "+this.dataService.maincontroller.currentAbrev+"\n"+fiatPrice;
								
								this.dataService.maincontroller.currentOrbs[this.token]["bestBuyPrice"] = price;
							
								
							 
							

						}else{
							this.buyPrice = "-";
						}

						if (sell_orders.length > 0) {
						 	
						 	var price = sell_orders[0].price;
							 fiatPrice = this.dataService.maincontroller.getFiatForToken(this.dataService.maincontroller.currentCurrency,price);

									this.sellPrice = this.dataService.getLang("buy")+"\n"+price + " "+this.dataService.maincontroller.currentAbrev+"\n"+fiatPrice;
								this.dataService.maincontroller.currentOrbs[this.token]["bestSellPrice"] = price;
							
							 
							

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
